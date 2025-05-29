## Git Workflow Strategy

### Overview

This document defines the Git workflow strategy, including branching model, naming conventions, and rules to ensure efficient and collaborative development.

### Branching Model

We follow a simplified Git Flow strategy with the following branches:

`main`: Only stable, production-ready code.

`feature/`: Feature development branches.

### Feature-branch naming 

Use descriptive names.
Example: `feature/practice1`

### Rules and Guidelines

Merge via pull request (PR) only.

All `feature/` branches should branch from and merge back into `main`.

### Pull Requests

All changes must go through PRs.

PRs require at least one approval before merging.

## Main Branch Protection

The `main` branch is protected with the following enforced rules:

- ❌ No direct commits allowed
- ✅ All changes must come through Pull Requests (PRs)
- ✅ At least **1 reviewer approval** is required before merging
- ✅ **Status checks** (CI/CD) must pass before merge

---

##  Pull Request Policy

- Create a PR from your working branch to `main`
- PRs require:
    - At least 1 code review and approval
    - Passing all automated checks
- **Only squash merges** are allowed:
    - PRs are merged as a single commit
    - Commit message should describe the feature or fix clearly

---

##  Post-Merge Cleanup

- After a PR is merged:
    - The **source branch is automatically deleted**

---

## ✅ Summary of Enforced Rules

| Rule                                     | Status       |
|------------------------------------------|--------------|
| Require PR for main branch               | ✅ Enabled   |
| Require 1 approval per PR                | ✅ Enabled   |
| Allow squash merges only                 | ✅ Enabled   |
| Disallow merge & rebase merges           | ✅ Enforced  |
| Auto-delete branch after PR merge        | ✅ Enabled   |
| Block direct commits to `main`           | ✅ Enforced  |