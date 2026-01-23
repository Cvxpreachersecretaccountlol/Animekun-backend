# Contributing to Animekun-Backend

Thank you for considering contributing to this project! We value every contribution, no matter how big or small. Your efforts help make this project better for everyone.

## Table of Contents

- [What We're Looking For](#what-were-looking-for)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Your Contribution](#submitting-your-contribution)
- [Code Standards](#code-standards)

## What We're Looking For

We welcome all types of contributions including:

- Bug fixes and issue resolution
- New features and enhancements
- Documentation updates and corrections
- Code optimization and refactoring
- Answering questions and helping other contributors

## Getting Started

Before diving in, please:

- Check existing [issues](https://github.com/Subhajeetch/Animekun-backend/issues) and [pull requests](https://github.com/Subhajeetch/Animekun-backend/pulls) to avoid duplicate work
- Read through the project documentation to understand the codebase
- Be respectful and constructive in all interactions

### When to Open an Issue vs Pull Request

- **Small changes** (typos, bug fixes, minor improvements): Feel free to open a pull request directly
- **Large changes** (new features, major refactors, breaking changes): Open an issue first to discuss your approach and get feedback

## Development Setup

### Requirements

- Node.js (version 14.x or higher)
- npm or yarn package manager
- Git for version control

### Installation Steps

1. Fork the [repository](https://github.com/Subhajeetch/Animekun-backend/fork) to your GitHub account

2. Clone your forked repository:

```bash
git clone https://github.com/<your_username>/Animekun-backend
cd Animekun-backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a new branch for your work:

```bash
git checkout -b type/descriptive-name
```

Branch naming conventions:
- `feature/feature-name` for new features
- `fix/issue-description` for bug fixes
- `docs/update-description` for documentation
- `refactor/component-name` for code refactoring

## Making Changes

### Running the Development Server

```bash
npm run dev
```

The API will start on `http://localhost:3000` (or your configured port).

### Running the Production Server

```bash
npm start
```

### Project Organization

```
.
├── routes/              # API route handlers
│   ├── index.js         # Main router configuration
│   ├── searchAnime.js   # Search anime endpoint
│   ├── getAnimeInfo.js  # Get anime information
│   ├── getHomepage.js   # Get homepage data
│   ├── getNews.js       # Get news articles
│   ├── getNewsById.js   # Get specific news article
│   ├── getAnimeByCategory.js
│   ├── getAnimeByGenre.js
│   ├── getAnimeEpesodeByAnimeId.js
│   ├── getAnimeEstimatedSchedule.js
│   ├── getAnimesByProducers.js
│   ├── getEpisodeServers.js
│   ├── getEpisodeSources.js
│   ├── getSearchSuggestion.js
│   ├── rawHianimeHomepage.js
│   └── proxy/
│       └── m3u8-proxy.js    # Media proxy for streaming
├── utils/               # Utility/helper functions
│   ├── allowedDomains.js
│   ├── fetchAndSaveData.js
│   ├── logNetworks.js
│   └── updateHomepageData.js
├── important/           # Important helper modules
│   ├── sections.js
│   └── underrated.js
├── docs/                # Project documentation
├── index.js             # Main application entry point
├── package.json         # Project dependencies and scripts
├── vercel.json          # Vercel deployment configuration
│
└── .env.local           # Environment variables (local only)

```

## Submitting Your Contribution

1. Ensure your code follows the project's style guidelines

2. Update documentation if you've changed functionality

3. Commit your changes using clear, descriptive commit messages (see format below)

4. Push to your fork:

```bash
git push origin your-branch-name
```

6. Open a pull request with:
   - A clear title describing the change
   - A detailed description of what you've done
   - References to related issues (e.g., "Fixes #123")
   - Screenshots for UI changes (if applicable)

## Code Standards

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): brief description

[optional body]
[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring without changing functionality
- `test` - Adding or updating tests
- `chore` - Maintenance tasks, dependency updates

**Examples:**
- `feat: add dark mode toggle`
- `fix: resolve login redirect issue`
- `docs: update installation instructions`
- `refactor: simplify authentication logic`

### Code Style

- Use meaningful variable and function names
- Write comments for complex logic, especially in API handlers
- Keep functions small and focused
- Follow existing code patterns in the project
- Use async/await for asynchronous operations
- Handle errors appropriately and return meaningful error messages
- Ensure proper HTTP status codes in API responses (200, 400, 404, 500, etc.)

### Testing

Before submitting a pull request:
- Test your API endpoints locally using tools like Postman or curl
- Verify that existing endpoints still work correctly
- Test both success and error cases
- Check console for any warnings or errors

### API Endpoint Guidelines

When adding new API endpoints:
1. Create a new route file in the `routes/` directory
2. Export an Express Router instance
3. Add meaningful comments for endpoint functionality
4. Include proper error handling and logging
5. Update the main router in `routes/index.js` to include your new route
6. Update the README.md with comprehensive documentation of your endpoint

---

Thank you for contributing! If you have questions, feel free to ask in the issues or discussions section.
