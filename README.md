# DoBy - GitHub Discord Bot & API

A modular application featuring both a Discord bot and REST API for GitHub integration.

## 🏗️ Architecture

```
DoBy/
├── services/
│   └── github.js          # Shared GitHub API service module
├── app.js                 # Express REST API server
├── bot.js                 # Discord bot
├── package.json
└── .env                   # Environment variables
```

### Modular Design

- **`services/github.js`** - Centralized GitHub API client with reusable functions
- **`app.js`** - Express server providing REST API endpoints
- **`bot.js`** - Discord bot using the shared GitHub service

## 🚀 Setup

### Prerequisites

- Node.js (v14 or higher)
- Discord Bot Token
- GitHub Personal Access Token (optional, for higher rate limits)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```env
DISCORD_TOKEN=your_discord_bot_token_here
GITHUB_API_KEY=your_github_token_here
```

3. Enable Message Content Intent in Discord Developer Portal:
   - Go to https://discord.com/developers/applications
   - Select your application
   - Go to "Bot" section
   - Enable "MESSAGE CONTENT INTENT" under Privileged Gateway Intents

### Running the Application

Run both services separately:

```bash
# Terminal 1: Start the REST API
nodemon app.js

# Terminal 2: Start the Discord Bot
nodemon bot.js
```

Or use `npm-run-all` for concurrent execution:

```bash
npm install npm-run-all --save-dev
```

Add to `package.json`:

```json
"scripts": {
  "start:api": "node app.js",
  "start:bot": "node bot.js",
  "dev:api": "nodemon app.js",
  "dev:bot": "nodemon bot.js",
  "dev": "npm-run-all --parallel dev:api dev:bot"
}
```

## 📡 REST API Endpoints

Base URL: `http://localhost:3000`

### User Endpoints

- **GET `/api/user?username=<username>`**

  - Get GitHub user information
  - Returns: user profile data

- **GET `/api/repos/:username?limit=<number>`**
  - Get user's public repositories
  - Query params: `limit` (default: 10)
  - Returns: array of repositories

### Repository Endpoints

- **GET `/api/repo/:username/:repoName`**

  - Get specific repository details
  - Returns: repository information

- **GET `/api/repo/:username/:repoName/issues?state=<open|closed|all>`**

  - Get repository issues
  - Query params: `state` (default: open)
  - Returns: array of issues

- **GET `/api/repo/:username/:repoName/pulls?state=<open|closed|all>`**
  - Get repository pull requests
  - Query params: `state` (default: open)
  - Returns: array of pull requests

### Example API Calls

```bash
# Get user info
curl "http://localhost:3000/api/user?username=torvalds"

# Get user repos
curl "http://localhost:3000/api/repos/microsoft?limit=5"

# Get specific repo
curl "http://localhost:3000/api/repo/microsoft/vscode"

# Get repo issues
curl "http://localhost:3000/api/repo/microsoft/vscode/issues?state=open"

# Get repo pull requests
curl "http://localhost:3000/api/repo/microsoft/vscode/pulls"
```

## 🤖 Discord Bot Commands

### Basic Commands

- **`!ping`** - Test bot responsiveness

### GitHub Commands

- **`!ghuser <username>`**

  - Display GitHub user profile with avatar, bio, followers, etc.
  - Example: `!ghuser torvalds`

- **`!ghrepos <username>`**

  - Show 5 most recently updated repositories
  - Example: `!ghrepos microsoft`

- **`!ghrepo <username> <repo>`**

  - Get detailed repository information
  - Example: `!ghrepo microsoft vscode`

- **`!ghissues <username> <repo>`**

  - List open issues in a repository (up to 5)
  - Example: `!ghissues facebook react`

- **`!ghprs <username> <repo>`**

  - List open pull requests in a repository (up to 5)
  - Example: `!ghprs nodejs node`

- **`!ghhelp`**
  - Show all available commands

## 🔧 GitHub Service Module

The `services/github.js` module provides these reusable functions:

```javascript
import {
  getUser,
  getUserRepos,
  getRepo,
  getRepoIssues,
  getRepoPRs,
} from "./services/github.js";

// All functions return { success: boolean, data?: any, error?: string }
```

### Available Functions:

- `getUser(username)` - Get user information
- `getUserRepos(username, limit)` - Get user's repositories
- `getRepo(username, repoName)` - Get repository details
- `getRepoIssues(username, repoName, state)` - Get repository issues
- `getRepoPRs(username, repoName, state)` - Get repository pull requests

## 🌟 Features

### Modularity Benefits

✅ **Shared Logic** - Single GitHub API client used by both bot and API  
✅ **Easy Maintenance** - Update GitHub logic in one place  
✅ **Consistent Error Handling** - Unified error responses  
✅ **Scalable** - Easy to add new endpoints or bot commands  
✅ **Testable** - Service functions can be tested independently

### API Features

- RESTful endpoints
- Query parameter support
- Consistent JSON responses
- Error handling with appropriate status codes

### Bot Features

- Rich embedded messages
- User-friendly error messages
- Command parsing
- Help command for discoverability

## 📝 Environment Variables

| Variable         | Description                             | Required             |
| ---------------- | --------------------------------------- | -------------------- |
| `DISCORD_TOKEN`  | Discord bot token from Developer Portal | Yes (for bot)        |
| `GITHUB_API_KEY` | GitHub Personal Access Token            | No (but recommended) |

**Note**: Without `GITHUB_API_KEY`, you're limited to 60 requests per hour. With a token, you get 5000 requests per hour.

## 🚧 Future Enhancements

- [ ] Database integration for caching
- [ ] Webhook support for real-time notifications
- [ ] Slash commands for Discord bot
- [ ] Rate limiting middleware
- [ ] Authentication for API endpoints
- [ ] More GitHub features (commits, branches, releases)

## 📄 License

ISC

## 👤 Author

Your Name

---

**Made with ❤️ using Discord.js and Express**
