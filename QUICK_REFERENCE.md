# Quick Reference Guide

## 🚀 Starting the Application

```bash
# Start API server
npm run dev:api

# Start Discord bot
npm run dev:bot
```

## 🤖 Discord Commands

| Command                   | Description     | Example                  |
| ------------------------- | --------------- | ------------------------ |
| `!ping`                   | Test bot        | `!ping`                  |
| `!ghuser <user>`          | Get user info   | `!ghuser torvalds`       |
| `!ghrepos <user>`         | Get user repos  | `!ghrepos microsoft`     |
| `!ghrepo <user> <repo>`   | Get repo info   | `!ghrepo facebook react` |
| `!ghissues <user> <repo>` | Get repo issues | `!ghissues nodejs node`  |
| `!ghprs <user> <repo>`    | Get repo PRs    | `!ghprs vercel next.js`  |
| `!ghhelp`                 | Show help       | `!ghhelp`                |

## 📡 API Endpoints

### Base URL: `http://localhost:3000`

| Endpoint                       | Method | Description    | Example                          |
| ------------------------------ | ------ | -------------- | -------------------------------- |
| `/api/user`                    | GET    | Get user info  | `/api/user?username=torvalds`    |
| `/api/repos/:username`         | GET    | Get user repos | `/api/repos/microsoft?limit=5`   |
| `/api/repo/:user/:repo`        | GET    | Get repo info  | `/api/repo/facebook/react`       |
| `/api/repo/:user/:repo/issues` | GET    | Get issues     | `/api/repo/nodejs/node/issues`   |
| `/api/repo/:user/:repo/pulls`  | GET    | Get PRs        | `/api/repo/vercel/next.js/pulls` |

## 📝 Code Examples

### Using the GitHub Service in Your Code

```javascript
import { getUser, getUserRepos, getRepo } from "./services/github.js";

// Get user
const userResult = await getUser("torvalds");
if (userResult.success) {
  console.log(userResult.data);
}

// Get repos
const reposResult = await getUserRepos("microsoft", 10);
if (reposResult.success) {
  console.log(reposResult.data);
}

// Get specific repo
const repoResult = await getRepo("facebook", "react");
if (repoResult.success) {
  console.log(repoResult.data);
}
```

### Testing API with curl

```bash
# Get user
curl "http://localhost:3000/api/user?username=torvalds"

# Get repos
curl "http://localhost:3000/api/repos/microsoft?limit=5"

# Get repo info
curl "http://localhost:3000/api/repo/facebook/react"

# Get issues
curl "http://localhost:3000/api/repo/nodejs/node/issues?state=open"
```

### Testing API with JavaScript (fetch)

```javascript
// Get user
const response = await fetch(
  "http://localhost:3000/api/user?username=torvalds"
);
const user = await response.json();
console.log(user);

// Get repos
const reposResponse = await fetch(
  "http://localhost:3000/api/repos/microsoft?limit=5"
);
const repos = await reposResponse.json();
console.log(repos);
```

## 🔧 Environment Variables

```env
# Required for Discord bot
DISCORD_TOKEN=your_discord_bot_token_here

# Optional but recommended (increases rate limit)
GITHUB_API_KEY=your_github_personal_access_token
```

## 🐛 Common Issues & Solutions

### Discord Bot Not Responding

```
Problem: Bot doesn't reply to commands
Solution:
1. Enable MESSAGE_CONTENT_INTENT in Discord Developer Portal
2. Check bot has permission to send messages
3. Verify DISCORD_TOKEN in .env
```

### GitHub API Rate Limit

```
Problem: "API rate limit exceeded"
Solution:
1. Add GITHUB_API_KEY to .env
2. Get token from: https://github.com/settings/tokens
```

### Port Already in Use

```
Problem: "Port 3000 is already in use"
Solution:
1. Change port in app.js: const port = 3001;
2. Or kill the process: npx kill-port 3000
```

## 📊 Response Formats

### GitHub Service Response

```javascript
{
  success: true,    // or false
  data: {...},      // on success
  error: "message"  // on failure
}
```

### API Success Response

```json
{
  "username": "torvalds",
  "name": "Linus Torvalds",
  "bio": "...",
  "public_repos": 5,
  "followers": 180000
}
```

### API Error Response

```json
{
  "error": "User not found"
}
```

## 🎨 Discord Embed Colors

- Blue (`0x0099ff`) - General info (user, repos, repo)
- Red (`0xff6b6b`) - Issues
- Teal (`0x4ecdc4`) - Pull Requests

## 📁 File Locations

```
DoBy/
├── services/github.js    # GitHub API logic
├── bot.js                # Discord bot
├── app.js                # Express API
├── .env                  # Your secrets (not committed)
├── .env.example          # Example env file
├── README.md             # Main docs
├── PROJECT_STATUS.md     # Current status
└── ARCHITECTURE.md       # Architecture diagram
```

## 🔄 Development Workflow

```bash
# 1. Make changes to code
# 2. nodemon auto-restarts
# 3. Test in Discord or browser
# 4. Check logs for errors
# 5. Repeat
```

## 💡 Tips

1. **Use nodemon** - Auto-restarts on file changes
2. **Check logs** - Errors appear in terminal
3. **Test incrementally** - Test each command/endpoint
4. **Read errors** - Error messages are helpful
5. **Use !ghhelp** - Show all bot commands

## 🚦 Status Check

```bash
# Check if API is running
curl http://localhost:3000

# Expected: "GitHub API Server is running 🚀"

# Check bot status
# Look for: "✅ Discord Bot logged in as [BotName]" in terminal
```

## 📚 Resources

- [Discord.js Guide](https://discordjs.guide/)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Express Docs](https://expressjs.com/)
- [Axios Docs](https://axios-http.com/)

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Start API
npm run dev:api

# Start bot
npm run dev:bot

# Both (if npm-run-all installed)
npm run dev
```
