/* 知识卡片 · eecs · CCAR-F 架构域深化(规格见 docs/card-system.md;金标准样例看 cards.eecs.js)
 * 5 张卡覆盖考纲 §5 场景 + Task Statement 1.4/1.5/1.6/1.7。追加式,改完跑 node tools/validate.js。 */
window.STUDY_CARDS = (window.STUDY_CARDS || []).concat([
  /* ===== Chapter 0 (cont.) · Exam Landscape ===== */
  {
    kp: "The six exam scenarios: what the exam actually tests",
    title: "The six exam scenarios: what the exam actually tests",
    subject: "eecs", scope: "claude-cert",
    mode: "learn",
    hook: "Six production scenarios frame every item; the right answer is the proportionate root-cause fix, not the fanciest one.",
    body: [
      { t: "Read the frame", p: "Every item sits inside one of six production scenarios, not the abstract. Know the API cold and you still miss by misreading the frame — the same fix is right in one scenario, over-built in another." },
      { t: "Six scenarios", p: "The bank: Customer Support Resolution Agent, Code Generation with Claude Code, Multi-Agent Research System, Developer Productivity, Claude Code for CI, and Structured Data Extraction. The exam draws 4 of these 6, each framing several questions." },
      { t: "Question anatomy", p: "The right option is the proportionate root-cause fix. Three distractors recur: over-engineering (a classifier where a prompt suffices), prompt-hoping (asking for what needs a guarantee), and solving a different problem (tool availability, not ordering)." },
      { t: "Where this leads", p: "Each scenario maps onto the task statements this course drills — enforcement and hooks for support, decomposition and session state for research and code. Read the scenario first, then the fix it tests." }
    ],
    example: "Support scenario: logs show 12% of refunds skip identity verification. The right answer is a programmatic gate blocking the refund tool until verification returns — not a stronger prompt (prompt-hoping) or a routing classifier (over-engineering).",
    pitfall: "Reaching for the most sophisticated option. The exam rewards the smallest fix that removes the root cause; an extra classifier or model is usually the over-engineered distractor, not the answer.",
    mnemonic: "Read the scenario, find the root cause, choose the proportionate fix — not the fanciest one.",
    minutes: 4, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  /* ===== Chapter 1 (cont.) · Agentic Architecture & Orchestration ===== */
  {
    kp: "Task decomposition: prompt chaining versus dynamic planning",
    title: "Task decomposition: prompt chaining versus dynamic planning",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Predictable multi-aspect work takes fixed prompt chaining; open-ended investigation takes dynamic decomposition that adapts to findings.",
    body: [
      { t: "One pass dilutes", p: "Review 14 files in one pass and quality degrades: deep feedback on some, shallow on others, bugs missed, and contradictions — a pattern flagged in one file yet identical code approved in another. Attention spreads too thin at once." },
      { t: "Prompt chaining", p: "For predictable, multi-aspect work, chain fixed steps: analyze each file individually for local issues, then run a separate cross-file integration pass. The sequence is fixed in advance, not chosen as you go." },
      { t: "Dynamic planning", p: "For open-ended tasks — 'add comprehensive tests to a legacy codebase' — do not fix the steps up front. Map the structure first, find the high-impact areas, then build a prioritized plan that adapts as dependencies surface." },
      { t: "Where this leads", p: "Match the pattern to the task, then feed it into orchestration: a coordinator decomposes research scope the same way, and session forking explores divergent decompositions. Related: coordinator-subagent and session-state topics." }
    ],
    example: "A 14-file PR splits into per-file local passes plus one integration pass — consistent depth, cross-file bugs caught. But 'add tests to a legacy module' starts by mapping structure and high-impact areas, then plans adaptively, since the subtasks depend on what you discover.",
    pitfall: "Forcing a fixed pipeline onto an open-ended investigation, or dumping every file into one pass — fixed chaining cannot adapt to findings, and a single mega-pass dilutes attention until depth and consistency collapse.",
    mnemonic: "Fixed steps chain; unknown steps adapt; split big reviews into local passes plus one integration pass.",
    minutes: 4, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Agent SDK hooks: interception and data normalization",
    title: "Agent SDK hooks: interception and data normalization",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Hooks give deterministic guarantees: PostToolUse normalizes tool results, interception blocks policy-violating calls — where a prompt only asks.",
    body: [
      { t: "Prompts only ask", p: "Your system prompt says never refund above $500, yet production still lets some through. Instructions buy probabilistic compliance — fine for style, not for a rule with money attached. You need a guarantee." },
      { t: "PostToolUse hook", p: "A `PostToolUse` hook intercepts a tool result before the model reads it. Use it to normalize heterogeneous formats — Unix timestamps from one MCP tool, ISO 8601 from another, numeric status codes from a third — into one shape." },
      { t: "Block the call", p: "A tool-call interception hook inspects an outgoing call and blocks it when it breaks policy — a `process_refund` over $500 — then redirects to an alternative workflow such as human escalation. The rule runs in code, on every call." },
      { t: "Where this leads", p: "The dividing line: hooks for deterministic guarantees, prompts for probabilistic guidance. Choose a hook whenever a rule must always hold — next stop, programmatic prerequisite gates, the same idea applied to tool ordering." }
    ],
    example: "Refunds above $500 must never auto-process. A prompt instruction leaks; a tool-call interception hook blocks any process_refund over that threshold and routes it to escalate_to_human — deterministic, not hoped-for. A PostToolUse hook converts each tool's timestamp to ISO 8601 first.",
    pitfall: "Relying on a prompt for a rule that must always hold — probabilistic compliance has a non-zero failure rate. When money or safety is on the line, enforce it in a hook, not in wording.",
    mnemonic: "PostToolUse cleans results, interception blocks bad calls; hooks guarantee, prompts only ask.",
    minutes: 3, difficulty: 3,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Workflow enforcement: programmatic gates and structured handoffs",
    title: "Workflow enforcement: programmatic gates and structured handoffs",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Prompt ordering fails silently; a programmatic gate blocks the downstream call until its prerequisite verifies — and hands off in structured form.",
    body: [
      { t: "Ordering leaks", p: "Your prompt says always verify identity first, yet logs show 12% of refunds skip `get_customer` and match on a stated name alone — sometimes refunding the wrong account. Prompt-only ordering has a non-zero failure rate." },
      { t: "Prereq gates", p: "Block the downstream tool call in code until the prerequisite completes: `process_refund` cannot fire until `get_customer` has returned a verified customer ID. The required sequence becomes deterministic instead of hoped-for." },
      { t: "Handoff summary", p: "Escalating mid-process, the human has no transcript. Compile a structured summary — customer ID, root cause, refund amount, recommended action — so they can act without replaying the whole conversation." },
      { t: "Where this leads", p: "Decompose multi-concern requests into distinct items, investigate each with shared context, then synthesize one resolution. The gate is built with an Agent SDK hook — see the hooks topic — and pairs with explicit escalation criteria." }
    ],
    example: "Logs show 12% of refunds skip verification. The proportionate fix is a programmatic prerequisite that blocks lookup_order and process_refund until get_customer returns a verified ID — not a stronger prompt (probabilistic) or a routing classifier (which fixes tool availability, not ordering).",
    pitfall: "Enforcing a critical sequence with prompt wording ('verify identity first') — it fails a non-zero fraction of the time. When errors carry financial consequences, gate the tool call programmatically.",
    mnemonic: "Gate the downstream call on its prerequisite; hand off with ID, root cause, and recommended action.",
    minutes: 4, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Session state: resumption, forking, and stale context",
    title: "Session state: resumption, forking, and stale context",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Resume named sessions to continue, fork_session to branch from a baseline; when tool results are stale, start fresh with a summary instead.",
    body: [
      { t: "Stale resumption", p: "You resume yesterday's investigation, but the code changed overnight. The session still holds the old tool results, so the agent reasons over a codebase that no longer exists. Resuming blindly is worse than starting clean." },
      { t: "Named resume", p: "`--resume` with a session name continues a specific prior conversation across work sessions. After edits, tell the agent which files changed so it re-analyzes those targets, instead of trusting stale context or re-exploring everything." },
      { t: "Fork a baseline", p: "`fork_session` branches independent copies from a shared analysis baseline. Explore divergent approaches in parallel — two testing strategies, two refactors — without redoing the common codebase analysis each time." },
      { t: "Where this leads", p: "The decision: resume when prior context is mostly valid; start fresh with an injected summary when tool results are stale. This feeds context management — scratchpad files carry state across the boundary." }
    ],
    example: "After a shared codebase analysis, you fork_session into two branches to compare a repository-pattern refactor against a service-layer one. Next morning you resume the winner, but first tell it the three files a teammate changed overnight — so it re-reads those instead of trusting stale results.",
    pitfall: "Resuming a session whose tool results are now stale — the agent reasons off outdated file contents. When prior results are no longer valid, start fresh and inject a structured summary rather than resuming.",
    mnemonic: "Resume named sessions, fork from a baseline; stale results mean start fresh with a summary.",
    minutes: 4, difficulty: 3,
    date: "2026-07-13", by: "opus"
  }
]);
