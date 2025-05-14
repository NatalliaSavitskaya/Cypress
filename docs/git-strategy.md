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