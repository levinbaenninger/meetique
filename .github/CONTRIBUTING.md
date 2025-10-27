# Contributing to Meetique

Thank you for your interest in contributing to Meetique. All contributions require maintainer approval before merging.

## Contribution Process

### Before Contributing

1. Check existing issues for related discussions
2. Open an issue first for new features or major changes
3. Wait for maintainer approval before implementing

### Setup

```bash
git clone https://github.com/levinbaenninger/meetique.git
cd meetique
bun install
cp .env.example .env
# Edit .env with your values
bun db:migrate
```

### Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test locally:

```bash
bun typecheck      # Type checking
bun lint:check     # Linting
bun format:check   # Formatting
bun build          # Build verification
```

4. Push branch and create pull request
5. Wait for maintainer review

## Code Standards

**TypeScript:**

- Use strict typing, no `any` types
- Prefer type inference where possible

**Naming:**

- camelCase for variables and functions
- PascalCase for components and classes
- UPPERCASE_SNAKE_CASE for constants

**Imports:**

- Use absolute imports with `@/` prefix
- Order: external, internal, relative

**Commit messages:**
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add meeting summary feature
fix: resolve video connection issue
docs: update API documentation
refactor: simplify agent creation logic
test: add unit tests for meeting service
```

## What to Contribute

**Accepted:**

- Bug fixes
- Performance improvements
- Documentation improvements
- Test coverage increases
- Accessibility improvements
- UI/UX enhancements

**Requires discussion first:**

- New features
- Breaking changes
- Architecture modifications
- New external dependencies

## Pull Request Requirements

All PRs must:

1. Pass all CI checks (tests, linting, type checking)
2. Have maintainer approval
3. Include documentation for new features
4. Be up to date with main branch

## Review Criteria

- Code quality and style consistency
- Test coverage for new features
- Documentation completeness
- Performance impact
- Security considerations
- Alignment with project goals

## Not Accepted

- Spam or low-quality PRs
- Unauthorized major changes
- Breaking changes without prior discussion
- Code that doesn't follow style guide
- Features without proper documentation

## Getting Help

- Questions: Open GitHub issue with `question` label
- Bug reports: Use bug report template
- Feature requests: Use feature request template
- Security issues: Follow [Security Policy](SECURITY.md) (do not open public issues)

## Community Guidelines

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing to Meetique, you agree that your contributions will be licensed under the MIT License.

---

For good first issues, look for `good first issue` or `help wanted` labels.
