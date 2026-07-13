/* 知识卡片 · eecs / claude-cert 续篇:Tool Design & MCP (TS 2.2/2.3/2.5) + Claude Code 配置 (TS 3.1/3.2/3.3/3.4/3.5)
 * 规格见 docs/card-system.md;金标准同 cards.eecs.js。追加式,改完跑 node tools/validate.js。 */
window.STUDY_CARDS = (window.STUDY_CARDS || []).concat([
  /* ===== Chapter 2 (cont.) · Tool Design & MCP ===== */
  {
    kp: "Structured tool errors: categories, retryability, recovery",
    title: "Structured tool errors: categories, retryability, recovery",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Tag every failure with a category, an isRetryable flag, and a readable reason; retry transient, explain business, and an empty result is not an error.",
    body: [
      { t: "Generic fails", p: "Every tool returns the same `Operation failed`. The agent retries a policy rejection forever, then gives up on a timeout it should have retried — the error carries nothing to separate recoverable from permanent." },
      { t: "Four categories", p: "MCP flags a failure with `isError`. Sort the cause into four kinds: transient (timeouts, service down), validation (bad input), business (policy violation), and permission (not allowed). Each needs its own response." },
      { t: "Structured meta", p: "Return `errorCategory`, an `isRetryable` boolean, and a readable description. On a business-rule violation add `retriable: false` and a customer-friendly reason, so the agent explains the block instead of retrying." },
      { t: "Recover, pass on", p: "A subagent fixes transient failures locally and propagates only what it cannot resolve, plus partial results. Keep an access failure (a retry decision) apart from a valid empty result (no matches, not an error). This feeds multi-agent error propagation." }
    ],
    example: "A `process_refund` on a $700 request returns `errorCategory: business`, `isRetryable: false`, description `Refunds over $500 need manager approval` — the agent escalates and explains rather than retrying; a `lookup_order` timeout returns `errorCategory: transient`, `isRetryable: true`, so it backs off and retries.",
    pitfall: "Uniform `Operation failed` responses (the agent cannot pick a recovery), or treating a valid empty result — no orders found — as an error and retrying a query that already succeeded.",
    mnemonic: "Category plus isRetryable plus reason; retry transient, explain business, empty is not an error.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Tool distribution and tool_choice configuration",
    title: "Tool distribution and tool_choice configuration",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Scope each agent to the few tools its role needs; add a narrow cross-role tool for frequent cases; tool_choice auto/any/forced sets how hard you steer selection.",
    body: [
      { t: "Too many tools", p: "Hand one agent 18 tools and its selection reliability drops sharply versus 4-5; a synthesis agent given web-search tools wanders off to run searches instead of synthesizing. The problem is decision complexity, not missing capability." },
      { t: "Scope by role", p: "Give each agent only the tools its role needs. For a genuine high-frequency cross-role need, add one narrow scoped tool — a `verify_fact` for the synthesis agent — and route the complex minority back through the coordinator." },
      { t: "Choice modes", p: "`tool_choice` sets how hard you steer: `auto` (the model may answer in plain text), `any` (it must call some tool), or forced selection `{type: tool, name: extract_metadata}` (it must call exactly that tool)." },
      { t: "Force first", p: "Force `extract_metadata` first, then process enrichment in follow-up turns; set `any` to guarantee a tool call over conversational text. This sets up forced tool use for structured output and scoped subagent design." }
    ],
    example: "The synthesis agent needs a quick fact-check on 85% of tasks and a deep investigation on 15%. Give it a scoped `verify_fact` tool for the common case and keep the rare deep cases routed through the coordinator — rather than handing it the whole web-search toolset it would misuse.",
    pitfall: "Over-provisioning an agent with tools outside its specialization (giving the synthesis agent full web search) — it violates separation of concerns and the agent misuses them, degrading selection for the tools it actually needs.",
    mnemonic: "Few role tools, one scoped cross-role tool; auto, any, or forced steers how tightly the model picks.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Built-in tools: Grep, Glob, Read, Edit, Bash",
    title: "Built-in tools: Grep, Glob, Read, Edit, Bash",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Grep searches contents, Glob matches filenames, Read/Write whole files, Edit needs a unique anchor; explore Grep-then-Read, never read-everything-upfront.",
    body: [
      { t: "Read-all trap", p: "Trying to understand a codebase by reading every file up front floods the context, and the model starts citing typical patterns instead of the classes it actually saw. You have to search first and read selectively." },
      { t: "Which tool", p: "`Grep` searches file contents (function names, error strings, import statements); `Glob` matches file paths by pattern (`**/*.test.tsx`); `Read`/`Write` handle whole files; `Edit` makes a targeted change by matching a unique anchor of text." },
      { t: "Edit fallback", p: "When `Edit`'s anchor text is not unique it fails — the usual cause. Fall back to `Read` the full file, then `Write` it back with the change. Do not keep retrying the ambiguous anchor." },
      { t: "Explore in order", p: "Build understanding incrementally: `Grep` for entry points, then `Read` to follow imports and trace flows; to map a wrapper module, list its exported names, then `Grep` each across the codebase. This underpins plan-mode exploration and the Explore subagent." }
    ],
    example: "To find every caller of `processRefund`, `Grep` the name across the repo instead of reading files blindly; to touch all tests, `Glob` `**/*.test.tsx`; when `Edit` reports the anchor `return null` matches six places, `Read` that file and `Write` the fix back.",
    pitfall: "Reading all files up front rather than Grep-then-Read (context exhaustion), or retrying `Edit` on a non-unique anchor instead of falling back to `Read` plus `Write`.",
    mnemonic: "Grep contents, Glob names, Edit a unique anchor, Read plus Write when it is not; search, then read.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  /* ===== Chapter 3 (cont.) · Claude Code Configuration & Workflows ===== */
  {
    kp: "CLAUDE.md modularity: @import and .claude/rules/",
    title: "CLAUDE.md modularity: @import and .claude/rules/",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Hierarchy is user vs project vs directory; user-level is never shared in git; @import and .claude/rules/ break up the monolith; /memory shows what actually loaded.",
    body: [
      { t: "New teammate gap", p: "A new hire clones the repo but Claude ignores the team's conventions. The cause: the rules live in your `~/.claude/CLAUDE.md`, which is user-level and never committed — so they never reached anyone else." },
      { t: "Three levels", p: "`CLAUDE.md` loads by hierarchy: user (`~/.claude/CLAUDE.md`, personal, not in git), project (`.claude/CLAUDE.md` or a root `CLAUDE.md`, shared through version control), and directory-level files. Team standards belong at project level." },
      { t: "Break it up", p: "Keep it modular. `@import` pulls in an external standards file only where a package needs it, and `.claude/rules/` holds focused topic files (`testing.md`, `api-conventions.md`, `deployment.md`) instead of one sprawling monolith." },
      { t: "Verify loading", p: "Run `/memory` to see which memory files actually loaded and to diagnose behavior that changes between sessions. From here, path-scoped rules and skills control what loads even more precisely." }
    ],
    example: "A new team member says Claude is not following the review checklist everyone else gets. You find the checklist in your `~/.claude/CLAUDE.md` — user-level, uncommitted. The fix is to move it into the project's `.claude/CLAUDE.md` so version control shares it with the whole team.",
    pitfall: "Putting shared team standards in user-level `~/.claude/CLAUDE.md` — it is not version-controlled, so teammates never receive it and behavior silently diverges per machine.",
    mnemonic: "User is private, project ships in git; @import and .claude/rules/ modularize; /memory verifies what loaded.",
    minutes: 4, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Path-specific rules: glob-scoped conventions",
    title: "Path-specific rules: glob-scoped conventions",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Put paths globs in a .claude/rules/ file so a convention loads only when editing a matching file, even when those files are scattered across directories.",
    body: [
      { t: "Scattered files", p: "Your test conventions sit in a subdirectory `CLAUDE.md`, but the test files live next to the code they test (`Button.test.tsx` beside `Button.tsx`) all over the tree. A directory-bound file cannot cover files spread everywhere." },
      { t: "Glob frontmatter", p: "A `.claude/rules/` file carries YAML frontmatter with a `paths` field of glob patterns (`paths: ['**/*.test.tsx']`, `paths: ['terraform/**/*']`). The rule activates by file path, not by which folder it sits in." },
      { t: "Loads on match", p: "A path-scoped rule loads only while you edit a matching file, keeping unrelated conventions out of context and saving tokens. When the file does not match the glob, nothing loads at all." },
      { t: "Beats folders", p: "When a convention must span directories, a glob rule beats a subdirectory `CLAUDE.md`, which is folder-bound and misses matches elsewhere. This pairs with the CLAUDE.md hierarchy and skills for controlling exactly what context loads." }
    ],
    example: "Test files are spread throughout the codebase and must all follow the same conventions regardless of location. The maintainable fix is a `.claude/rules/` file with `paths: ['**/*.test.tsx']` — not a per-directory `CLAUDE.md`, which cannot reach files scattered across many folders.",
    pitfall: "Using a subdirectory `CLAUDE.md` for a convention that must apply to files spread across the codebase — it is directory-bound and misses matches; a glob rule catches them by file type wherever they live.",
    mnemonic: "paths glob in .claude/rules/ — loads on match, spans directories a folder-bound CLAUDE.md cannot.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Skills and slash commands: frontmatter controls",
    title: "Skills and slash commands: frontmatter controls",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Project .claude/commands and skills ship in git; SKILL.md frontmatter — context: fork isolates output, allowed-tools restricts, argument-hint prompts for params.",
    body: [
      { t: "Only you have it", p: "You wrote a `/review` command but teammates who clone the repo do not get it — you put it in your personal `~/.claude/commands/`. A command everyone should share has to live in the repo's `.claude/commands/`." },
      { t: "Where they live", p: "Project scope (`.claude/commands/`, `.claude/skills/`) ships through version control for the whole team; personal scope (`~/.claude/`) stays with you. Give a personal skill variant a different name so it does not shadow the team's." },
      { t: "Frontmatter", p: "A skill's `SKILL.md` frontmatter controls it: `context: fork` runs it in an isolated sub-agent so verbose output never pollutes the main chat; `allowed-tools` restricts which tools it may call; `argument-hint` prompts for missing parameters." },
      { t: "Skill vs always", p: "Skills load on demand for a task; `CLAUDE.md` is always loaded for universal standards — choose by whether the guidance is occasional or constant. This connects to plan mode and the Explore subagent." }
    ],
    example: "You want a `/review` command every developer gets on clone — create it in the project's `.claude/commands/`, not `~/.claude/commands/`. And a codebase-analysis skill that prints thousands of tokens gets `context: fork` so its output stays out of the main conversation.",
    pitfall: "Putting a team command or skill in personal `~/.claude/` when everyone should have it — or omitting `context: fork` on a verbose skill, so its exploratory output floods and derails the main context.",
    mnemonic: "Project .claude ships in git; fork isolates, allowed-tools restricts, argument-hint prompts; skills on demand, CLAUDE.md always.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Plan mode versus direct execution",
    title: "Plan mode versus direct execution",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Plan mode for architectural, multi-file, multiple-approach work; direct execution for a scoped single-file fix; the Explore subagent keeps discovery out of context.",
    body: [
      { t: "Costly rework", p: "You start a monolith-to-microservices split with direct execution; halfway in, a hidden dependency breaks your service boundaries and a day of edits gets torn out. The scope needed exploring before any change touched a file." },
      { t: "When to plan", p: "Plan mode is for large-scale, multi-file changes carrying architectural decisions or several valid approaches — a library migration touching 45+ files, choosing between integration strategies — exploring and designing safely before you edit." },
      { t: "When direct", p: "Direct execution fits well-scoped, well-understood changes: a single-file bug fix with a clear stack trace, adding one date-validation conditional. Planning that is pure overhead — just make the change." },
      { t: "Explore, combine", p: "Use the Explore subagent to keep verbose discovery out of the main context; often you plan the investigation, then direct-execute the plan. This builds on Grep/Read exploration and subagent context isolation." }
    ],
    example: "Restructuring a monolith into microservices — dozens of files, decisions about service boundaries and module dependencies — calls for plan mode to explore and design before changing anything. A one-file bug fix with a clear stack trace just needs direct execution.",
    pitfall: "Starting an architectural, multi-file change in direct execution and only switching to plan mode when complexity surfaces — the complexity was stated up front, and discovering dependencies late forces exactly the rework plan mode prevents.",
    mnemonic: "Architectural and multi-file, plan; scoped single-file, execute; Explore subagent to isolate discovery.",
    minutes: 4, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Iterative refinement: examples, tests, interview pattern",
    title: "Iterative refinement: examples, tests, interview pattern",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Show 2-3 input/output examples when prose is read inconsistently; write tests first and share failures; interview to surface considerations; batch interacting fixes.",
    body: [
      { t: "Prose drifts", p: "You describe a transformation in words (`normalize these dates`) and get a different interpretation every run. Vague prose is read inconsistently; a couple of concrete examples pin the behavior down where description cannot." },
      { t: "Show examples", p: "Give 2-3 concrete input/output examples instead of more description — they communicate the expected transformation far more reliably than prose when results keep varying, and let the model generalize to novel cases." },
      { t: "Tests and ask", p: "Test-driven iteration: write the test suite first (behavior, edge cases, performance), then iterate by sharing the failures. The interview pattern has Claude ask questions up front to surface considerations — cache invalidation, failure modes — you had not named." },
      { t: "Batch or serial", p: "Put interacting problems in one detailed message so the fixes account for each other; handle independent problems sequentially. This feeds few-shot prompting and validation-retry loops downstream." }
    ],
    example: "A migration script mishandles null values. Rather than re-describing the rule, give a specific test case — an input row with a null field and its expected output — and iterate until it passes. For an unfamiliar domain, have Claude interview you first to surface cache-invalidation and failure-mode decisions before it writes code.",
    pitfall: "Piling more prose onto an instruction the model keeps misreading instead of giving concrete input/output examples — and fixing interacting issues one at a time, so each fix quietly reintroduces another.",
    mnemonic: "Examples over prose, tests first then share failures, interview to surface, batch the interacting fixes.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  }
]);
