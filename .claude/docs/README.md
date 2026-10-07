# Project docs (.claude/docs)

Everything about this portfolio, written so that a person or a Claude Code session can pick it up cold.
Start with **TODO.md**, then read the rest in this order when you need it.

| File | What it answers |
| --- | --- |
| [TODO.md](./TODO.md) | **Things left to do.** Placeholders, missing content, decisions waiting on Christabel, optional polish. |
| [PROJECT-OVERVIEW.md](./PROJECT-OVERVIEW.md) | What this is, who it is for, the page structure, the stack, how to run it. |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | File map, server vs client components, how data flows into the page, why the scripts are plain DOM code. |
| [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) | Colour, type, grid, breakpoints, class vocabulary, per-section layout notes. |
| [CONTENT-MODEL.md](./CONTENT-MODEL.md) | Where every piece of copy lives, the `Project` type, how to add or edit a project, placeholder behaviour. |
| [INTERACTIONS.md](./INTERACTIONS.md) | How each motion and behaviour works: teardown scene, work motion, Beacon drawing, case-study dialog, nav, toasts. |
| [ACCESSIBILITY-AND-PERFORMANCE.md](./ACCESSIBILITY-AND-PERFORMANCE.md) | What is done for keyboard, screen readers, reduced motion, and speed; what to test. |
| [CONTENT-RULES-AND-FACTS.md](./CONTENT-RULES-AND-FACTS.md) | **Read before editing any copy.** Hard rules (never invent), verified facts, and corrections already made. |
| [DECISIONS-AND-HISTORY.md](./DECISIONS-AND-HISTORY.md) | How the design got here: themes tried, what was kept, what was dropped, and why. |
| [DEPLOYMENT-AND-TESTING.md](./DEPLOYMENT-AND-TESTING.md) | Deploying (Vercel), the checks to run, and the browser test recipes used to verify the build. |

Keep these files current. When you change behaviour, update the doc that describes it in the same change.
