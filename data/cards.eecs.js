/* 知识卡片 · eecs(规格见 docs/card-system.md;金标准样例看 cards.math.js / cards.chinese.js / cards.english.js)
 * agent 只往下面数组里追加卡片对象,改完跑 node tools/validate.js。 */
window.STUDY_CARDS = (window.STUDY_CARDS || []).concat([
  /* ===== Chapter 0 · Exam Landscape ===== */
  {
    kp: "Anthropic certification tracks and exam logistics",
    title: "Anthropic certification tracks and exam logistics",
    subject: "eecs", scope: "claude-cert",
    mode: "learn",
    hook: "Four Pearson VUE tracks; CCAR-F is 60 Q, 120 min, pass 720; agentic architecture is the heaviest domain.",
    body: [
      { t: "Four exam tracks", p: "Four exams run through Pearson VUE: Associate–Foundations (CCAO-F), Architect–Foundations (CCAR-F), Architect–Professional (CCAR-P), and Developer–Foundations (CCDV-F). CCAR-F is the one this course targets." },
      { t: "CCAR-F format", p: "CCAR-F is 60 multiple-choice items in 120 minutes, scaled 100–1000 with 720 to pass, 125 USD, valid 12 months. Take it OnVUE (online proctored) or at a test center." },
      { t: "Retake policy", p: "Up to four attempts per rolling 12 months, with waits of 14, then 30, then 90 days between successive retakes." },
      { t: "Domain weights", p: "Five domains: Agentic Architecture 27%, Claude Code Configuration 20%, Prompt Engineering 20%, Tool Design & MCP 18%, Context & Reliability 15%. Agentic architecture is heaviest." }
    ],
    example: "A candidate scores 700 on CCAR-F — just under the 720 cutoff — so they wait 14 days before a second of their four annual attempts.",
    pitfall: "Cramming API trivia while under-preparing the heaviest domain, agentic architecture (27%) — more questions ride on it than on any other topic.",
    mnemonic: "Foundations before Professional; 720 passes; spend study time on the 27%.",
    minutes: 4, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  /* ===== Chapter 1 · Agentic Architecture & Orchestration ===== */
  {
    kp: "The agent loop: model, tools, environment",
    title: "The agent loop: model, tools, environment",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Gather context, model reasons, tool call, append result, repeat until a stop_reason ends it.",
    body: [
      { t: "Loop steps", p: "The agent loop: gather context, the model reasons, it emits a tool call, the result is appended to the messages, and the cycle repeats until a stop condition holds." },
      { t: "Env feedback", p: "Tool results are the environment feedback — the model sees the outcome of its last action and decides the next step from it, the way an agent perceives then acts." },
      { t: "Stop reasons", p: "`stop_reason` says why generation halted: `end_turn`, `tool_use`, `max_tokens`, or `stop_sequence`. A value of `tool_use` means run the tool and loop again." },
      { t: "Who owns loop", p: "With the raw Messages API the loop lives in YOUR code — you detect `tool_use`, run the tool, append the result, and re-call the API. Higher-level SDKs run this loop for you." }
    ],
    example: "The model replies with `stop_reason: tool_use` and a call to `get_weather(city='Tokyo')`; your code runs it, appends the JSON as a tool_result, and calls the API again.",
    pitfall: "Treating `end_turn` and `tool_use` alike and stopping on a tool call — the model was asking you to run a tool and feed the result back, not finishing its turn.",
    mnemonic: "Reason, call, observe, repeat — stop only on end_turn.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Orchestration patterns: single agent, subagents, pipelines",
    title: "Orchestration patterns: single agent, subagents, pipelines",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Start with one well-equipped agent; reach for subagents and pipelines only when context or parallelism demands it.",
    body: [
      { t: "Single agent", p: "A single agent with well-designed tools beats a premature multi-agent setup: fewer moving parts, one context, easier to debug. Make it your default." },
      { t: "Subagents", p: "Subagents isolate context — each runs in a fresh window on a scoped task and returns only a summary, keeping the orchestrator's context clean." },
      { t: "Pipelines", p: "Use pipelines and fan-out for independent work that parallelizes; an orchestrator-worker pattern splits tasks across workers and gathers their results." },
      { t: "How to choose", p: "Choose by context size, parallelism, and blast radius: one agent when it fits a window, subagents to firewall context, pipelines when steps are independent." }
    ],
    example: "Reviewing 20 files: fan out one subagent per file (parallel, isolated context), each returning a short findings summary the orchestrator merges — not one agent reading all 20 into a single window.",
    pitfall: "Reaching for multi-agent orchestration before trying a single agent with good tools — the added coordination and context-passing often cost more than they save.",
    mnemonic: "One agent first; subagents to isolate; pipelines to parallelize.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Guardrails and autonomy: approvals, allowlists, stop conditions",
    title: "Guardrails and autonomy: approvals, allowlists, stop conditions",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Autonomy scales with reversibility — auto-run reads, gate mutations, and always put a human on irreversible actions.",
    body: [
      { t: "Permission tiers", p: "Tier permissions by risk: read-only actions can run automatically, while mutating actions should require approval. Routine work stays fast, dangerous work stays supervised." },
      { t: "Allowlists", p: "Tool allowlists constrain what the agent may call at all — an explicit set of permitted tools and argument patterns beats trusting the model to self-restrain." },
      { t: "Stop conditions", p: "Cap runaway loops with max-iteration limits and budget stops, and sandbox execution so a mistake stays contained instead of spreading." },
      { t: "Autonomy rule", p: "Keep a human in the loop for irreversible actions. The guiding principle: autonomy should scale with reversibility — the easier to undo, the more you can automate." }
    ],
    example: "A deploy agent auto-runs `git status` and tests (read-only), asks before `git push`, and always requires human sign-off before `terraform apply` to production.",
    pitfall: "Granting broad autonomy on irreversible actions — letting an agent delete data or deploy to prod without approval, where one wrong step cannot be undone.",
    mnemonic: "Reads auto, writes ask, irreversible needs a human.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Claude Agent SDK core abstractions",
    title: "Claude Agent SDK core abstractions",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "The Agent SDK gives you the loop, tools, hooks, permission modes, MCP, and sessions — the Messages API makes you build the loop yourself.",
    body: [
      { t: "What SDK packs", p: "The Claude Agent SDK packages the agent loop (`query`/client), tool definitions, hooks, permission modes, MCP server connections, and session management into one runtime." },
      { t: "API vs SDK", p: "Contrast: with the Messages API you own the agent loop and wire every tool call yourself; the Agent SDK provides that loop plus the surrounding tooling." },
      { t: "Same harness", p: "The SDK is built on the same harness that powers Claude Code, so agents you build inherit its permission model, hooks, and MCP integration." }
    ],
    example: "Instead of hand-writing the tool-use loop against the Messages API, you call the Agent SDK's `query()` with your tools, hooks, and a permission mode, and it drives the loop, approvals, and session state.",
    pitfall: "Assuming the Messages API runs the agent loop for you — it does not; you must detect tool_use and re-call it. The Agent SDK is what supplies the loop.",
    mnemonic: "Messages API = you own the loop; Agent SDK = loop plus tooling, same harness as Claude Code.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  /* ===== Chapter 2 · Tool Design & MCP ===== */
  {
    kp: "Tool schema design: descriptions, parameters, misuse resistance",
    title: "Tool schema design: descriptions, parameters, misuse resistance",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Descriptions say WHEN to use a tool; keep tools few and orthogonal, parameters typed, and errors actionable.",
    body: [
      { t: "When not what", p: "A tool description should tell the model WHEN to reach for the tool, not merely what it does — usage cues prevent wrong-tool errors better than a restated name." },
      { t: "Typed params", p: "Define parameters with JSON Schema — enums, formats, required fields — so the model fills them correctly and invalid calls are caught before they run." },
      { t: "Few orthogonal", p: "Prefer few, orthogonal tools over many overlapping ones; overlap makes the model hesitate. Add idempotency notes and clear naming conventions." },
      { t: "Actionable err", p: "Return errors the model can recover from — say what went wrong and how to fix it, so the next call self-corrects instead of repeating the mistake." }
    ],
    example: "Replace overlapping `search` and `find` tools with one `search_records(query, status?: enum)`; on bad input return `error: unknown status 'archved'; valid: open, closed` so the model retries correctly.",
    pitfall: "Writing a description that only restates the tool name (get_user gets a user) with no guidance on WHEN to use it — the model then picks the wrong tool or calls it needlessly.",
    mnemonic: "Say when, type the params, keep them few and orthogonal, make errors fixable.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "MCP architecture: hosts, clients, servers, transports",
    title: "MCP architecture: hosts, clients, servers, transports",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Host holds clients (one per server); servers expose tools, resources, and prompts over stdio or HTTP.",
    body: [
      { t: "Three roles", p: "MCP has three roles: the host application holds one client per connected server, and each server exposes tools, resources, and prompts. The client-server link is 1:1." },
      { t: "Transports", p: "Two transport types: stdio for a local server running as a subprocess, and HTTP-based transport for a remote server reached over the network." },
      { t: "Discovery", p: "Clients discover capabilities through list endpoints — a server advertises its tools, resources, and prompts, and servers can be written in any language." },
      { t: "Why it matters", p: "MCP standardizes integrations across apps: one server works with any MCP-compatible host, so you build a connector once instead of once per application." }
    ],
    example: "Claude Desktop (host) spawns a local filesystem MCP server over stdio and a remote GitHub server over HTTP; it opens one client per server and calls list-tools to learn what each offers.",
    pitfall: "Thinking one client talks to many servers — the client-server relationship is 1:1; the host is what aggregates multiple clients, one per server.",
    mnemonic: "Host has clients, one per server; servers serve tools over stdio or HTTP.",
    minutes: 3, difficulty: 3,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Integrating external services: auth and error handling",
    title: "Integrating external services: auth and error handling",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Keep secrets server-side, use OAuth with least-privilege scopes, and surface rate-limit and permission failures as structured tool results.",
    body: [
      { t: "Secrets stay out", p: "Secrets belong on the server side, in environment variables — never pasted into prompts or tool descriptions, where they would leak into the context and logs." },
      { t: "OAuth scopes", p: "Remote MCP servers authenticate with OAuth; grant least-privilege scopes so a compromised token can do the minimum, not act as the whole account." },
      { t: "Error results", p: "Surface rate-limit and permission failures as structured tool results the model can read and react to, rather than swallowing them or crashing the loop." },
      { t: "Timeout budget", p: "Enforce timeouts and a retry budget at the tool layer so one slow or failing dependency cannot stall the whole agent run." }
    ],
    example: "A CRM tool reads its API key from an env var, requests only the read:contacts OAuth scope, and on HTTP 429 returns `error: rate_limited; retry_after=30` so the agent waits instead of hammering.",
    pitfall: "Embedding an API key or token directly in the prompt or tool description — it leaks into context, transcripts, and logs, and any least-privilege scoping is lost.",
    mnemonic: "Secrets in env, scopes least-privilege, errors structured, timeouts at the tool.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  /* ===== Chapter 3 · Claude Code Configuration & Workflows ===== */
  {
    kp: "Settings hierarchy and permission modes",
    title: "Settings hierarchy and permission modes",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Enterprise wins, then CLI flags, then local, project, user settings; rules are allow/ask/deny; modes are default, acceptEdits, plan, bypass.",
    body: [
      { t: "Layer order", p: "Settings merge by precedence, highest first: enterprise-managed policy, CLI flags, local project (`.claude/settings.local.json`), project (`.claude/settings.json`), then user (`~/.claude/settings.json`)." },
      { t: "Rule types", p: "Permission rules are allow, ask, or deny, each matched by a tool name plus an optional specifier pattern such as `Bash(git push:*)`." },
      { t: "Four modes", p: "Permission modes set the default posture: `default` asks on risky actions, `acceptEdits` auto-accepts file edits, `plan` is read-only planning, `bypassPermissions` skips prompts." }
    ],
    example: "A repo's `.claude/settings.json` denies `Bash(curl:*)` while a developer allows it locally — yet an enterprise-managed policy denying network tools still wins, sitting at the top of the hierarchy.",
    pitfall: "Assuming user settings override project settings — precedence runs the other way: local and project sit above user, and enterprise policy overrides them all.",
    mnemonic: "Enterprise, CLI, local, project, user — top wins; allow/ask/deny; default, acceptEdits, plan, bypass.",
    minutes: 4, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "CLAUDE.md, skills, and hooks",
    title: "CLAUDE.md, skills, and hooks",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "CLAUDE.md loads every session, skills load on demand, hooks fire deterministically — hooks for MUST, prompts for SHOULD.",
    body: [
      { t: "CLAUDE.md", p: "`CLAUDE.md` holds persistent project instructions loaded into every session; it can pull in more files with `@path` imports. Use it for standing context." },
      { t: "Skills", p: "Skills are on-demand instruction packs (a `SKILL.md` plus assets) the model loads when relevant, so specialized guidance stays out of the base context until needed." },
      { t: "Hooks vs prompts", p: "Hooks are deterministic shell commands on lifecycle events — `PreToolUse` can block a call, plus `PostToolUse`, `Stop`, and more. Use a hook when it MUST happen, a prompt when it SHOULD." }
    ],
    example: "To guarantee formatting, a `PostToolUse` hook runs the linter after every edit (deterministic); to merely encourage it, a line in `CLAUDE.md` asks the model to lint — the hook is chosen because it MUST happen.",
    pitfall: "Relying on a CLAUDE.md instruction for something that must always happen — the model can skip a prompt; only a hook is deterministic. Reserve prompts for SHOULD, hooks for MUST.",
    mnemonic: "CLAUDE.md always-on, skills on demand, hooks when it MUST.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Headless mode and CI/CD integration",
    title: "Headless mode and CI/CD integration",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "claude -p runs non-interactive; scope tools with --allowedTools, take JSON output, and wire it into CI with tight risk controls.",
    body: [
      { t: "Print mode", p: "`claude -p` (print mode) runs Claude Code non-interactively: pass a prompt, get output, exit — the basis for scripting and automation." },
      { t: "Output formats", p: "`--output-format json` or `stream-json` gives machine-readable results for pipelines, and exit codes signal success or failure to the surrounding script." },
      { t: "CI patterns", p: "Common jobs: issue triage, PR review, and scheduled tasks, often via GitHub Actions. Scope each run with `--allowedTools` so it can only do its job." },
      { t: "Risk controls", p: "In pipelines, constrain tools, avoid broad write or network access, and prefer read-and-comment over auto-merge so an automated run cannot cause irreversible damage." }
    ],
    example: "A GitHub Action runs `claude -p 'review this PR' --allowedTools Read,Grep --output-format json`; it can read and comment but not push, and a non-zero exit code fails the check.",
    pitfall: "Running headless in CI with broad tool access and auto-apply — an unattended agent with write and deploy permissions can do irreversible damage; scope tools and keep a human gate.",
    mnemonic: "-p for headless, JSON out, --allowedTools in, keep CI on a short leash.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  /* ===== Chapter 4 · Prompt Engineering & Structured Output ===== */
  {
    kp: "System prompts and instruction hierarchy",
    title: "System prompts and instruction hierarchy",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "System sets role and rules, user carries the task; put stable content first for caching; within a turn, system outranks user.",
    body: [
      { t: "System vs user", p: "The system prompt sets role, constraints, and output rules; the user message carries the specific task. Keep durable instructions in system, per-request detail in user." },
      { t: "Cache order", p: "Put stable content early and volatile content late — a fixed prefix is cache-friendly and lets prompt caching reuse it across requests." },
      { t: "Structure it", p: "Use XML tags to separate sections and state explicit output contracts, so the model knows exactly what shape to return." },
      { t: "Conflicts", p: "When instructions conflict within a turn, they resolve toward system over user — the system prompt is the higher authority." }
    ],
    example: "System: you are a support agent that replies only in JSON with keys reply and sentiment. User: my order is late. The role, format, and constraints live in system; only the ticket text is in the user turn.",
    pitfall: "Burying stable role and format rules in the user message and changing them each call — it breaks prompt caching and weakens their authority versus system-level instructions.",
    mnemonic: "System = role and rules, user = task; stable first for cache; system wins ties.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Structured output: JSON mode and forced tool use",
    title: "Structured output: JSON mode and forced tool use",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Forcing tool_choice to a named schema-validated tool is the most reliable structured output; prefill and validate-then-retry back it up.",
    body: [
      { t: "Forced tool use", p: "Set `tool_choice` to type `tool` with a specific `name`: the model must call exactly that tool, and its arguments are validated against the tool's JSON Schema — the most reliable structured output." },
      { t: "Prefill trick", p: "Prefilling the start of the assistant turn (for example an opening brace) nudges the model straight into the target format and skips preamble." },
      { t: "Validate retry", p: "Even with guidance, validate the parsed output and retry on failure — treat a schema-invalid response as a recoverable error, not a crash." },
      { t: "When not force", p: "Do not force a schema for open-ended reasoning or drafting — rigid structure there suppresses the very thinking you want." }
    ],
    example: "Need a sentiment and score every time? Define an `extract_sentiment` tool and set `tool_choice` to force it — the model must return arguments matching the schema, so parsing never fails.",
    pitfall: "Asking for JSON in prose and hoping — the model may wrap it in markdown fences or add commentary. Forcing a schema-validated tool call removes that ambiguity.",
    mnemonic: "Force a named tool for guaranteed shape; prefill to start it; validate and retry; skip it for open thinking.",
    minutes: 3, difficulty: 3,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Few-shot, chain-of-thought, and eval-driven iteration",
    title: "Few-shot, chain-of-thought, and eval-driven iteration",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Show examples for format, let it think for hard reasoning, and iterate against a small eval set built from real failures.",
    body: [
      { t: "Few-shot format", p: "For matching a specific format, examples beat instructions — two or three worked examples convey the shape faster than a paragraph describing it." },
      { t: "When to think", p: "Chain-of-thought and extended thinking help on hard, multi-step reasoning, at the cost of extra tokens and latency — spend that budget where problems are genuinely hard." },
      { t: "Eval loop", p: "Build a small eval set from real failures and iterate prompt, then eval, then prompt again — measuring change beats eyeballing single outputs." },
      { t: "Avoid overfit", p: "Do not overfit to one example: if every case mimics a single sample, the prompt learns that case, not the general pattern." }
    ],
    example: "A classifier keeps mislabeling refunds; you add three labeled examples (few-shot), collect 20 past mistakes into an eval set, and tweak the prompt until the set passes — instead of trusting one lucky output.",
    pitfall: "Iterating on a single hand-picked example with no eval set — the prompt overfits to that case and quietly regresses on others you never measured.",
    mnemonic: "Examples for format, thinking for hard cases, evals to prove it, no overfitting.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  /* ===== Chapter 5 · Context Management & Reliability ===== */
  {
    kp: "Context windows and prompt caching",
    title: "Context windows and prompt caching",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "200K-class windows; cache_control needs an identical prefix; 5-min TTL refreshes on use; reads ~0.1x, writes ~1.25x — stable content first.",
    body: [
      { t: "Window size", p: "Claude models offer 200K-class context windows — large, but not free: everything resent each turn costs tokens and latency, so what you keep in context matters." },
      { t: "Cache breakpoint", p: "Prompt caching marks reusable prefixes with `cache_control` breakpoints; a cache hit needs a byte-identical prefix, so any change early in the prompt busts the cache." },
      { t: "TTL and cost", p: "The default cache TTL is 5 minutes and refreshes on each use (a 1-hour option exists); cache reads cost about 0.1x and writes about 1.25x of base input." },
      { t: "Order matters", p: "Order content stable-to-volatile so the cached prefix stays intact. Batching requests is a separate concern and does not affect caching." }
    ],
    example: "A 30K-token system prompt with tool defs carries a cache breakpoint; reused within 5 minutes it reads at ~0.1x cost — but moving one earlier sentence changes the prefix and forces a full re-write.",
    pitfall: "Putting volatile content (a timestamp, per-user data) before the cached prefix — it changes the prefix every call, so the cache never hits and you pay write cost each time.",
    mnemonic: "Identical prefix or no hit; stable first, volatile last; reads cheap, writes a bit more.",
    minutes: 3, difficulty: 3,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Long conversations: compaction, externalization, retrieval",
    title: "Long conversations: compaction, externalization, retrieval",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Compact old turns, externalize state to files or a DB and retrieve on demand, and use subagents as context firewalls.",
    body: [
      { t: "Compaction", p: "As a conversation grows, summarize or compact older turns into a shorter form — keep the gist and current state, drop the verbatim back-and-forth." },
      { t: "Externalize", p: "Push durable state out to files or a database and retrieve only what a step needs, instead of carrying every detail in the live context window." },
      { t: "Firewalls", p: "Use subagents as context firewalls: a subagent does bulky work in its own window and returns a summary, so the main context never sees the raw volume." },
      { t: "Do not resend", p: "Avoid resending large artifacts every turn; keep a sliding window of recent turns plus pinned instructions, and re-fetch big content only when required." }
    ],
    example: "A day-long refactor summarizes finished files into a one-line log, writes the plan to `PLAN.md`, and spawns a subagent to read a 5K-line file and report only the three functions to change — keeping the main window small.",
    pitfall: "Re-pasting a huge file or full log into every turn — it fills the window fast and raises cost each call; externalize it and retrieve on demand instead.",
    mnemonic: "Compact the old, externalize the state, firewall with subagents, pin what must stay.",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "opus"
  },
  {
    kp: "Production reliability: retries, rate limits, batching, fallback",
    title: "Production reliability: retries, rate limits, batching, fallback",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Handle 429/529 with backoff and jitter, respect retry-after, use the Batch API for bulk, and log stop_reason and usage.",
    body: [
      { t: "Backoff jitter", p: "On HTTP 429 (rate limited) or 529 (overloaded), retry with exponential backoff plus jitter, and honor the `retry-after` header when it is present." },
      { t: "Idempotency", p: "Make retried operations idempotent so a repeat after a timeout does not double-apply an effect — pair this with sensible timeouts on each call." },
      { t: "Batch API", p: "For non-interactive bulk work the Batch API runs asynchronously within 24 hours at about a 50% cost discount — the wrong choice for anything latency-sensitive." },
      { t: "Fallback obs", p: "Keep model fallback chains for outages, and log `stop_reason` and token `usage` for observability so you can see truncation and cost." }
    ],
    example: "A nightly job classifying 100K tickets submits them to the Batch API (async, 24h, ~50% cheaper); the live support endpoint instead retries 529s with backoff-plus-jitter and falls back to a smaller model when the primary is down.",
    pitfall: "Retrying 429s in a tight loop with no backoff or jitter — synchronized retries hammer the API and worsen the rate limiting; respect retry-after and spread attempts out.",
    mnemonic: "Backoff with jitter, obey retry-after, batch the bulk, log stop_reason and usage.",
    minutes: 3, difficulty: 3,
    date: "2026-07-11", by: "opus"
  }
]);
