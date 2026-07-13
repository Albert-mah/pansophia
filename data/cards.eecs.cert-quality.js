/* 知识卡片 · eecs · CCAR-F 深化批(D4/D5 · 8 张,规格见 docs/card-system.md;金标准样例看 cards.eecs.js)
 * 官方依据:CCAR-F Exam Guide v1.0,Task Statement 4.1/4.4/4.5/4.6/5.2/5.3/5.5/5.6。
 * agent 只往下面数组里追加卡片对象,改完跑 node tools/validate.js。 */
window.STUDY_CARDS = (window.STUDY_CARDS || []).concat([
  /* ===== Chapter 4 (cont.) · Prompt Engineering & Structured Output ===== */
  {
    kp: "Explicit criteria: precision and false-positive control",
    title: "Explicit criteria: precision and false-positive control",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Categorical criteria beat 'be conservative'; one concrete code example per severity; disable high-false-positive categories to rebuild trust.",
    body: [
      { t: "Trust collapses", p: "A CI review told to 'be conservative' and report 'only high-confidence findings' still floods PRs with false positives, so developers stop reading its comments. Vague confidence instructions do not raise precision." },
      { t: "Be categorical", p: "Use specific categorical criteria: 'flag a comment only when its claimed behavior contradicts the actual code' beats 'check that comments are accurate'. Name what to report (bugs, security) versus what to skip (minor style)." },
      { t: "Severity levels", p: "Define each severity level with a concrete code example so classification stays consistent. When one category floods false positives, temporarily disable it to rebuild trust while you improve its prompt." },
      { t: "Where it leads", p: "Back criteria with few-shot examples that separate acceptable patterns from real issues, and add a `detected_pattern` field to study dismissals — see 'Few-shot, chain-of-thought' and 'Validation, retry, and feedback loops'." }
    ],
    example: "A reviewer's 'be conservative' prompt yields a 40% false-positive rate on a 'magic numbers' check. The fix: define exactly what to flag ('a literal repeated in 3+ files'), give one code example per severity, and disable the check while refining — not another 'only high-confidence' line.",
    pitfall: "Leaning on vague confidence instructions ('be conservative', 'only high-confidence') to cut false positives — they do not raise precision; specific categorical criteria and one concrete example per severity level do.",
    mnemonic: "Name the category, show one example per severity, disable the noisy one — vague confidence never lifts precision.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Validation, retry, and feedback loops",
    title: "Validation, retry, and feedback loops",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Retry with the exact validation error + original doc + failed extraction; retries fix format, never missing facts; tool use kills syntax errors, not semantic ones.",
    body: [
      { t: "Blind retries", p: "An extractor returns an invoice whose line items do not sum to the stated total. Retrying without saying what broke just repeats the mistake — and retrying for a field that is absent from the source can never succeed." },
      { t: "Retry with error", p: "On a validation failure, send a follow-up containing the original document, the failed extraction, and the specific validation error. That feedback is what steers the model to self-correct." },
      { t: "Retry's limit", p: "Retries fix format and structural errors (wrong field, malformed shape), not information missing from the source. Tool use eliminates JSON syntax errors but not semantic ones — values in the wrong field, totals that do not add up." },
      { t: "Self-checks", p: "Extract `calculated_total` beside `stated_total` to flag mismatches, add `conflict_detected` booleans for inconsistent sources, and a `detected_pattern` field to analyze dismissals — feeding 'Human review and confidence calibration'." }
    ],
    example: "A `tool_use` schema guarantees valid JSON, yet an extraction has line items summing to $95 against a `stated_total` of $950. The retry appends 'calculated_total 95 does not equal stated_total 950' plus the document, and the model fixes a mis-read digit. A missing tax ID, absent from the page, no retry recovers.",
    pitfall: "Retrying with no error feedback, retrying for a field simply not in the source, or assuming tool use prevents semantic errors — the first repeats the mistake, the second can never succeed, and tool use only removes syntax errors.",
    mnemonic: "Feed back the exact error; know what a retry cannot fix; self-check calculated versus stated.",
    minutes: 3, difficulty: 3,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Batch processing: the Message Batches API",
    title: "Batch processing: the Message Batches API",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "50% off, up to 24h, no latency SLA — overnight audits yes, blocking pre-merge no; correlate by custom_id; resubmit only the failures.",
    body: [
      { t: "Wrong workflow", p: "Moving a blocking pre-merge check to the Batch API for its 50% discount can leave developers waiting up to 24 hours to merge. The savings are real, but the latency profile has to match the workload." },
      { t: "When batch fits", p: "The Message Batches API gives ~50% savings within an up-to-24-hour window with no latency SLA — ideal for overnight reports, weekly audits, nightly test generation; wrong for anything a human blocks on. It cannot do multi-turn tool calling inside one request." },
      { t: "Run the SLA math", p: "Correlate each request and response by `custom_id`, and size submission frequency to the SLA: with 24-hour processing, 4-hour submission windows keep you inside a 30-hour guarantee." },
      { t: "Refine first", p: "Refine the prompt on a sample before batching the full volume, and on failure resubmit only the failed `custom_id`s with fixes (e.g. chunking oversized docs) — see 'Validation, retry, and feedback loops'." }
    ],
    example: "A nightly technical-debt report goes to the Batch API (async, up to 24h, ~50% cheaper) while the pre-merge check stays synchronous. When 6 of 100 documents fail for exceeding context, only those `custom_id`s are chunked and resubmitted — not the whole batch, and never the blocking check moved to batch.",
    pitfall: "Switching a blocking, latency-sensitive workflow to the Batch API for the discount, or expecting multi-turn tool calls inside a batch request — neither works; batch is for non-blocking, latency-tolerant jobs correlated by `custom_id`.",
    mnemonic: "Batch the overnight, never the blocking; custom_id correlates; resubmit only the failures.",
    minutes: 4, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Multi-instance and multi-pass review",
    title: "Multi-instance and multi-pass review",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "An independent instance beats self-review's blind spot; per-file passes plus a cross-file integration pass beat one diluted pass.",
    body: [
      { t: "Self-review gap", p: "Ask the session that just wrote the code to review it and it approves its own subtle bug — it still holds its generation reasoning. And one pass over 14 files dilutes attention, giving deep notes on some and flagging a pattern it approved elsewhere." },
      { t: "Fresh instance", p: "A second Claude instance, without the generator's reasoning context, catches subtler issues than any 'review your own work' instruction or extended thinking bolted onto the original session." },
      { t: "Split the passes", p: "For a large multi-file review, run a focused per-file pass for local issues, then a separate cross-file integration pass for data flow between files. This beats one pass over everything and beats a bigger context window." },
      { t: "Score findings", p: "Have each pass self-report confidence beside every finding so review routing is calibrated — the same signal feeds 'Human review and confidence calibration'." }
    ],
    example: "A 14-file PR reviewed in one pass gives contradictory feedback, flagging a pattern in file A it approved in file B. The fix: a fresh instance reviews each file for local bugs, then one integration pass traces cross-file data flow — not a larger model on the same single pass, and not consensus-of-three, which suppresses real one-off bugs.",
    pitfall: "Trusting a model to review its own output in the same session, or reviewing many files in one pass — self-review keeps the generation blind spot and single-pass dilutes attention; use an independent instance and split into per-file plus integration passes.",
    mnemonic: "Fresh eyes, not self-review; per-file then integration; score confidence per finding.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  /* ===== Chapter 5 (cont.) · Context Management & Reliability ===== */
  {
    kp: "Escalation and ambiguity resolution",
    title: "Escalation and ambiguity resolution",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Escalate on explicit demand (immediately), policy gaps, and no-progress; sentiment and self-confidence are bad proxies; multiple identity matches means ask, not guess.",
    body: [
      { t: "Backwards triage", p: "An agent stuck at 55% resolution against an 80% target escalates easy photo-evidence replacements yet handles policy-exception cases itself. The decision boundary is unclear, so it handles exactly the wrong cases." },
      { t: "Real triggers", p: "Escalate on three signals: the customer explicitly asks for a human (honor it at once, no investigation first), policy is silent or ambiguous (e.g. competitor price-matching when it covers only own-site), or the agent cannot progress." },
      { t: "Bad proxies", p: "Sentiment and self-reported confidence are poor proxies for complexity — the agent is already wrongly confident on hard cases. On multiple identity matches, ask for another identifier; never pick heuristically." },
      { t: "How to fix", p: "Add explicit escalation criteria with few-shot examples to the system prompt showing escalate versus resolve — the few-shot idea from 'Few-shot, chain-of-thought', paired with 'Error propagation in multi-agent systems'." }
    ],
    example: "A customer demands a human — escalate at once, no investigation. Another asks to price-match a competitor when policy only addresses own-site — escalate the policy gap. Two customers share a name — ask for an order ID, do not guess. Fixed by escalation criteria plus few-shot examples in the system prompt, not a sentiment threshold or a self-confidence score.",
    pitfall: "Escalating on sentiment or a self-reported confidence score, or heuristically picking one of several identity matches — sentiment and confidence do not track complexity, and guessing an identity risks the wrong account; ask for an identifier and escalate on explicit demand or policy gaps.",
    mnemonic: "Human asked, policy silent, stuck — escalate; never on sentiment; ask when identity is ambiguous.",
    minutes: 4, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Error propagation in multi-agent systems",
    title: "Error propagation in multi-agent systems",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Propagate failure type + attempted query + partial results + alternatives; recover transient failures locally; empty-as-success and whole-workflow termination are anti-patterns.",
    body: [
      { t: "Generic errors", p: "A search subagent times out and returns 'search unavailable', so the coordinator cannot tell what was tried or what partial results exist. Worse, a subagent that swallows the timeout as an empty success makes the final report silently incomplete." },
      { t: "Say what failed", p: "Propagate structured error context — failure type, the attempted query, any partial results, and possible alternatives — so the coordinator can retry, reroute, or proceed with partial data." },
      { t: "Recover locally", p: "Subagents recover locally from transient failures and propagate only what they cannot resolve. Distinguish an access failure (a timeout needing a retry decision) from a valid empty result (a successful query with no matches)." },
      { t: "Coverage gaps", p: "Never suppress errors or kill the whole run on one failure; structure synthesis output with coverage annotations marking well-supported findings versus gaps — see 'Information provenance' and 'Human review and confidence calibration'." }
    ],
    example: "The web-search subagent times out. It returns structured context — failure type 'timeout', the attempted query, two partial hits, and an alternative source — so the coordinator proceeds with partial results and annotates the report's coverage gap. It does not return 'search unavailable', mark empty-as-success, or kill the whole run.",
    pitfall: "Returning a generic 'search unavailable', suppressing an error as an empty success, or terminating the whole workflow on one subagent failure — all hide context the coordinator needs; propagate structured error context and attempt local recovery first.",
    mnemonic: "Say what failed and what you tried; fix transient errors locally; annotate coverage gaps.",
    minutes: 3, difficulty: 3,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Human review and confidence calibration",
    title: "Human review and confidence calibration",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Aggregate 97% hides per-type failures; segment by document type and field; calibrate field-level confidence, route low-confidence or contradictory cases to review.",
    body: [
      { t: "Averages hide", p: "An extraction pipeline reports 97% aggregate accuracy, so you cut human review — then a whole document type (handwritten forms) sitting at 60% slips through unchecked. The average masked a segment that fails." },
      { t: "Segment first", p: "Validate accuracy by document type and by field segment before reducing human review, so you know every segment holds up — not just the blended number." },
      { t: "Calibrate scores", p: "Have the model output field-level confidence scores and calibrate review thresholds on a labeled validation set. Use stratified random sampling of high-confidence extractions to keep measuring error rates and catch novel patterns." },
      { t: "Route the risky", p: "Send low-confidence or contradictory-source cases to limited reviewer capacity first — the confidence signal comes from 'Multi-instance and multi-pass review', the contradictory-source part from 'Information provenance'." }
    ],
    example: "Overall accuracy is 97%, but stratified sampling shows scanned PDFs at 78% while digital forms hit 99%. You keep human review on scanned PDFs, route low-confidence and conflicting-source extractions to reviewers, and automate only the segments proven accurate field by field — not the whole pipeline on the 97% headline.",
    pitfall: "Reducing human review on an aggregate accuracy figure — it can hide a document type or field that fails; segment accuracy by type and field, calibrate field-level confidence on labeled data, and route low-confidence or contradictory cases to reviewers.",
    mnemonic: "Do not trust the average — segment it; calibrate confidence on labeled data; route the risky to humans.",
    minutes: 3, difficulty: 2,
    date: "2026-07-13", by: "opus"
  },
  {
    kp: "Information provenance and multi-source synthesis",
    title: "Information provenance and multi-source synthesis",
    subject: "eecs", scope: "claude-cert",
    mode: "drill",
    hook: "Preserve claim-source mappings through synthesis; annotate conflicts with attribution and dates, do not arbitrarily pick; render financial as tables, news as prose, findings as lists.",
    body: [
      { t: "Summaries lose", p: "A synthesis agent summarizes findings and quietly drops which source each claim came from, so the report cannot be traced back. And when two credible sources report different numbers, it just picks one, hiding a real conflict." },
      { t: "Keep mappings", p: "Require subagents to output structured claim-source mappings — source URL, document name, excerpt — that downstream agents preserve and merge through synthesis, so every claim keeps its attribution." },
      { t: "Don't just pick", p: "On conflicting statistics from credible sources, annotate the conflict with attribution, not arbitrarily choosing one. Include publication or collection dates so a temporal gap is not misread as a contradiction, and split well-established findings from contested ones." },
      { t: "Render by type", p: "Present each content type in its natural form — financial data as tables, news as prose, technical findings as lists. This closes the research pipeline alongside 'Error propagation in multi-agent systems'." }
    ],
    example: "Two credible reports give different market-size figures. The synthesis keeps both, attributed, with their collection dates (one 2024, one 2026 — not a contradiction), places them in a 'contested' section, and renders the figures as a table. It does not average them, silently pick the higher one, or drop the source URLs during summarization.",
    pitfall: "Letting summarization strip claim-source mappings, or resolving conflicting credible sources by arbitrarily picking one value — instead preserve attribution through synthesis, annotate conflicts with sources and dates, and separate well-established from contested findings.",
    mnemonic: "Keep the source on every claim; annotate conflicts with dates; render each type in its own form.",
    minutes: 4, difficulty: 3,
    date: "2026-07-13", by: "opus"
  }
]);
