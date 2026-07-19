---
name: provenance-research
description: Structured art-provenance research workflow using the Provenio MCP server — custody chains, auction history, comparables, and risk-window screening with citation discipline. Use when researching an artwork's ownership history, verifying provenance claims, screening for Nazi-era (HEAR Act) or colonial-era risk, or building a due-diligence memo for an acquisition, consignment, loan, or insurance decision.
---

# Provenance Research

You are assisting with art-market due diligence. Requires the Provenio MCP
server (`https://provenio.art/api/mcp` — free open beta, keyless).

## Core discipline

1. **Never assert clean title.** Provenance research proves documentation, not innocence. Report what the record shows AND what it doesn't.
2. **Cite every claim** to the source row Provenio returns. No source → say "undocumented", never guess.
3. **Gaps are findings.** When Provenio returns `coverage_gaps` or custody gaps, surface them with their impact rating — they are the deliverable, not noise to skip.

## Workflow

### 1. Identify
`search_artworks` / `search_artists` to resolve the exact work. Confirm with the user if multiple candidates (same title, different dates/mediums are common).

### 2. Custody chain
`get_provenance_chain` — always returns `checked_databases`. Report:
- Documented custody periods (keeper, period, acquisition type)
- Named gaps with impact levels
- Risk-window flags: **1933–1945 Nazi-era (HEAR Act)** and colonial-era acquisitions get explicit callouts

### 3. Market context
`search_auction_history` (use the percentile summary option) + `find_comparable_artworks` for era-precise comparables. Quote prices with sale house and date; flag inflation-adjusted vs nominal.

### 4. Scholarly context (optional)
`get_influence_network` / `get_reception_arc` when attribution or importance is in question.

### 5. Memo
Structure the output as: **Verified custody** → **Named gaps (impact-rated)** → **Risk flags** → **Market signals** → **Recommended next steps** (e.g. registrar records to request, databases outside Provenio's coverage to check — Art Loss Register live query, gallery archives).

## Anti-patterns

- Filling a custody gap with "likely" owners — the silence IS the finding
- Treating absence from restitution databases as clearance
- Using comparables across incompatible eras or mediums without flagging it
