# Project Bruce

Pilot repository for the Claude ↔ ChatGPT ↔ human collaboration workflow.

- **Business source of truth:** the Project Bruce folder in Google Drive (Project Brief, Collaboration Charter, Task Queue, Handoff and Review Template).
- **Code source of truth:** this repository and its merged pull requests.

## How work flows

1. A task is queued in the Task Queue with acceptance criteria.
2. Claude implements it on a branch and opens a pull request with the handoff from the Handoff and Review Template.
3. ChatGPT reviews that exact commit independently.
4. The human owner approves and merges. No AI approves its own work.

## Run the tests

Requires Node.js 20 or newer. There are no dependencies to install.

```
npm test
```

`src/taskStatus.js` encodes the charter's task statuses (Backlog → Ready → Building → Review → Awaiting human approval → Done, with a Changes requested loop) so tools can check a status move before making it.

## Data rules

Low-sensitivity information only. No credentials, banking or client identifiers, statements or regulated data in code, issues, PRs or screenshots. Use synthetic examples for tests.
