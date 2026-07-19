#!/usr/bin/env node
/**
 * provenio-mcp — stdio bridge to Provenio's remote MCP server
 *
 * Allows any MCP client that requires stdio transport (e.g. Claude Desktop,
 * Claude Code, Cursor, VS Code extensions) to connect to Provenio's
 * Streamable HTTP endpoint at https://provenio.art/api/mcp.
 *
 * Usage:
 *   npx provenio-mcp                       # free tier (500 req/day)
 *   PROVENIO_KEY=pk_xxx npx provenio-mcp   # pro tier (unlimited)
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const PROVENIO_URL = process.env.PROVENIO_URL ?? "https://provenio.art/api/mcp";
const PROVENIO_KEY = process.env.PROVENIO_KEY;

async function main() {
  // Connect to remote Provenio MCP server
  const headers = PROVENIO_KEY ? { "x-provenio-key": PROVENIO_KEY } : {};
  const remoteTransport = new StreamableHTTPClientTransport(
    new URL(PROVENIO_URL),
    { requestInit: { headers } }
  );

  const remoteClient = new Client(
    { name: "provenio-mcp-bridge", version: "0.3.2" },
    { capabilities: {} }
  );

  await remoteClient.connect(remoteTransport);

  // Discover tools and prompts from the remote server
  const { tools } = await remoteClient.listTools();
  const { prompts } = await remoteClient.listPrompts().catch(() => ({ prompts: [] }));

  // Spin up a local stdio server that proxies to the remote
  const localServer = new Server(
    { name: "provenio", version: "0.3.2" },
    {
      capabilities: {
        tools: tools.length > 0 ? {} : undefined,
        prompts: prompts.length > 0 ? {} : undefined,
      },
    }
  );

  // Proxy tool calls
  localServer.setRequestHandler(
    { method: "tools/list" },
    async () => ({ tools })
  );

  localServer.setRequestHandler(
    { method: "tools/call" },
    async (request) => {
      const result = await remoteClient.callTool(
        request.params.name,
        request.params.arguments ?? {}
      );
      return result;
    }
  );

  // Proxy prompt calls
  if (prompts.length > 0) {
    localServer.setRequestHandler(
      { method: "prompts/list" },
      async () => ({ prompts })
    );

    localServer.setRequestHandler(
      { method: "prompts/get" },
      async (request) => {
        return remoteClient.getPrompt(
          request.params.name,
          request.params.arguments ?? {}
        );
      }
    );
  }

  // Start stdio transport
  const stdioTransport = new StdioServerTransport();
  await localServer.connect(stdioTransport);

  // Clean shutdown
  process.on("SIGINT", async () => {
    await localServer.close();
    await remoteClient.close();
    process.exit(0);
  });
}

main().catch((err) => {
  process.stderr.write(`provenio-mcp error: ${err.message}\n`);
  process.exit(1);
});
