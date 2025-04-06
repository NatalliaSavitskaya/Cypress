Git Workflow Strategy

Overview

This document defines the Git workflow strategy, including branching model, naming conventions, and rules to ensure efficient and collaborative development.

Branching Model

We follow a simplified Git Flow strategy with the following main branches:

main: Production-ready code.

develop: Ongoing development integration branch.

feature/: Feature development branches.

bugfix/: Small bug fixes that are not critical.

hotfix/: Critical fixes that need to go directly into main.

release/: Prepares a new production release.

Branch Naming Conventions

Feature branches: feature/short-description

Bugfix branches: bugfix/issue-id-description

Hotfix branches: hotfix/issue-id-description

Release branches: release/x.y.z

Examples:

feature/login-ui

bugfix/123-fix-header

hotfix/456-crash-on-start

release/1.2.0

Rules and Guidelines

main Branch

Protected: Only maintainers can merge.

Only stable, production-ready code.

Merge via pull request (PR) only.

develop Branch

Contains the latest approved code.

All feature branches should branch from and merge back into develop.

Feature Branches

Branch off: develop

Merge into: develop

Use descriptive names.

Submit PRs for review.

Bugfix Branches

Branch off: develop

Merge into: develop

Reference issue/ticket when possible.

Hotfix Branches

Branch off: main

Merge into: main and develop

Urgent fixes only.

Release Branches

Branch off: develop

Merge into: main and develop

Used to prepare for production releases (testing, version bump, minor bug fixes).

Pull Requests

All changes must go through PRs.

PRs require at least one approval before merging.

Ensure branch is up to date with target before merging.

Commit Messages

Use clear, concise messages.

Format: type(scope): description

Examples:

feat(auth): add login form

fix(ui): resolve header overlap on mobile

Tags and Releases

Tag releases on main using semantic versioning: vX.Y.Z