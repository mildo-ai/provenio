# Provenio — Art Provenance MCP

**Provenance and market intelligence for AI agents.** A 282,731-node knowledge
graph over 273,378 art-market transactions — the Getty Provenance Index, the
Knoedler stock books (1872–1971), ERR and wartime-restitution records — served
to any MCP-compliant client.

**Every answer is cited. Custody gaps are named, never guessed.** Hallucination
is held under 1%, verified by an externally reproducible evaluation harness
rather than self-report. Where the record is silent, Provenio returns an
explicit gap — it never asserts clean title.

🌐 **https://provenio.art** · Free open beta — no key, no card.

## Quick start

Add the remote server to any MCP client:

```
https://provenio.art/api/mcp
```

- **Claude** (claude.ai / Desktop): Settings → Connectors → Add custom connector → paste the URL
- **ChatGPT** (MCP enabled): add as a connector — `search` / `fetch` compatible
- **Cursor / other clients**: streamable-http transport, no auth header needed

Open beta: 5,000 queries/month per IP, all 27 tools, full corpus. Need a
higher cap? Write to ceo@provenio.art.

## What's inside

| Axis | Coverage |
|---|---|
| Knowledge graph | 282,731 nodes · CIDOC-CRM / PROV-O aligned |
| Market transactions | 273,378 (99,892 with verified inflation-adjusted prices) |
| Provenance corpus | Getty Provenance Index · Knoedler 1872–1971 · ERR · curated wartime restitution |
| Risk flagging | Nazi-era 1933–1945 (HEAR Act) · colonial-era · dealer-fraud windows |
| Non-Western depth | Korean Dansaekhwa (Kim Whanki, Lee Ufan, Park Seo-Bo) market + exhibition histories |
| Tools | 27 typed tools · 15 prompts — search, provenance chains, comparables, influence networks, reception arcs, BYOK federation |

## Tools (selection)

- `get_provenance_chain` — full custody chain with verification state and risk-window flags; always returns `checked_databases`
- `search_auction_history` — lot-level prices with optional P25/50/75/90 percentile summary in one call
- `find_comparable_artworks` — era-precise, market-guarded comparables
- `get_influence_network` / `get_reception_arc` — scholarly influence and verbatim critical reception with source refs
- `byok_external_query` — federate your own Artnet/Artprice/gallery-DB credentials (SSRF-guarded)

Full catalogue: [provenio.art/docs](https://provenio.art/docs) ·
[OpenAPI 3.1 spec](https://provenio.art/openapi.yaml)

## Registries

- Official MCP Registry: [`io.github.mildo-ai/provenio`](https://registry.modelcontextprotocol.io/v0/servers?search=provenio)
- Smithery: [`mildo-ai/provenio`](https://smithery.ai/server/@mildo-ai/provenio)

## Honesty engineering

Provenio's design contract, in one line: *no model memorises art history —
Provenio lets any model cite it.* Every response binds to a verifiable source
row; absences come back as named `coverage_gaps`; the evaluation harness that
certifies the <1% hallucination rate is re-runnable against the live API.

Read the methodology: [The Invisible Gaps](https://provenio.art/report) ·
[Genesis — the artwork](https://provenio.art/genesis)

---

Built and operated by [Hoyeob Kim](https://provenio.art/genesis/colophon) · Mildo Inc. ·
Contact: ceo@provenio.art

*This repository hosts the public server manifest and documentation for the
hosted MCP service. The knowledge-graph pipeline and web application live in a
private monorepo.*
