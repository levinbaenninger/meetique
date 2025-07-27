# Contributing to Meetique 🤝

Thank you for your interest in contributing to Meetique! We welcome contributions from the community while maintaining high code quality and project direction.

## 🚦 Contribution Process

### Before Contributing

1. **Check existing issues** - Look for related issues or discussions
2. **Open an issue first** - For new features or major changes, please open an issue to discuss before implementing
3. **Get approval** - All contributions require maintainer approval before merging

### How to Contribute

#### 1. Fork & Clone

```bash
git clone https://github.com/levinbaenninger/meetique.git
cd meetique
```

#### 2. Set Up Development Environment

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Set up database
pnpm db:migrate
```

#### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

#### 4. Make Your Changes

- Follow the existing code style
- Add tests if applicable
- Update documentation if needed
- Ensure all existing tests pass

#### 5. Test Your Changes

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint:check

# Run formatting
pnpm format:check

# Build the project
pnpm build
```

#### 6. Submit a Pull Request

- Push your branch to your fork
- Create a pull request with a clear description
- Link any related issues
- Wait for maintainer review

## 📋 Contribution Guidelines

### Code Style

- **TypeScript**: Use strict typing, no `any` types
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Formatting**: Use Prettier (runs automatically)
- **Linting**: Follow ESLint rules
- **Imports**: Use absolute imports with `@/` prefix

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new meeting summary feature
fix: resolve video connection issue
docs: update API documentation
style: format code with prettier
refactor: simplify agent creation logic
test: add unit tests for meeting service
```

### What We're Looking For

- **Bug fixes** - Help us improve stability
- **Performance improvements** - Optimize existing features
- **Documentation** - Improve docs and examples
- **Tests** - Increase test coverage
- **Accessibility** - Improve a11y compliance
- **UI/UX improvements** - Enhance user experience

### What Needs Discussion First

- **New features** - Please open an issue first
- **Breaking changes** - Must be discussed and approved
- **Architecture changes** - Requires maintainer approval
- **External dependencies** - New dependencies need justification

## 🔍 Review Process

### All PRs Must:

1. **Pass CI checks** - All tests and linting must pass
2. **Have maintainer approval** - At least one maintainer must approve
3. **Include documentation** - Update docs for new features
4. **Be up to date** - Resolve any merge conflicts

### Review Criteria:

- Code quality and style consistency
- Test coverage for new features
- Documentation completeness
- Performance impact
- Security considerations
- Alignment with project goals

## 🚫 Not Accepted

- **Spam or low-quality PRs**
- **Unauthorized major changes**
- **Breaking changes without discussion**
- **Code that doesn't follow our style guide**
- **Features without proper documentation**

## 📞 Getting Help

- **Questions?** Open a GitHub issue with the `question` label
- **Bug reports** Use the bug report template
- **Feature requests** Use the feature request template
- **Security issues** Please follow our [Security Policy](SECURITY.md) (don't open public issues)

## 🤝 Community Guidelines

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing to ensure a welcoming and inclusive environment for everyone.

## 🎯 Good First Issues

Look for issues labeled `good first issue` or `help wanted` - these are great starting points for new contributors.

## 📜 License

By contributing to Meetique, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make Meetique better!** 🚀
