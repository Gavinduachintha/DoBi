# DoBy Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      DoBy Application                        │
│                    (Modular Architecture)                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐              ┌──────────────────────┐
│   Discord Bot        │              │   Express API        │
│   (bot.js)           │              │   (app.js)           │
│   Port: Discord WS   │              │   Port: 3000         │
└──────────┬───────────┘              └──────────┬───────────┘
           │                                     │
           │         ┌───────────────────┐       │
           └────────►│  GitHub Service   │◄──────┘
                     │ (services/        │
                     │  github.js)       │
                     └─────────┬─────────┘
                               │
                               ▼
                     ┌───────────────────┐
                     │  GitHub API       │
                     │  api.github.com   │
                     └───────────────────┘
```

## Data Flow

### Discord Bot Flow

```
Discord User
    │
    │ !ghuser torvalds
    ▼
Discord Bot (bot.js)
    │
    │ getUser("torvalds")
    ▼
GitHub Service (services/github.js)
    │
    │ GET /users/torvalds
    ▼
GitHub API
    │
    │ User Data
    ▼
GitHub Service
    │
    │ { success: true, data: {...} }
    ▼
Discord Bot
    │
    │ Formatted Embed
    ▼
Discord User
```

### REST API Flow

```
HTTP Client (Browser/Postman)
    │
    │ GET /api/user?username=torvalds
    ▼
Express Server (app.js)
    │
    │ getUser("torvalds")
    ▼
GitHub Service (services/github.js)
    │
    │ GET /users/torvalds
    ▼
GitHub API
    │
    │ User Data
    ▼
GitHub Service
    │
    │ { success: true, data: {...} }
    ▼
Express Server
    │
    │ JSON Response
    ▼
HTTP Client
```

## Module Dependencies

```
┌─────────────────────────────────────────────────┐
│  services/github.js                             │
├─────────────────────────────────────────────────┤
│  Dependencies:                                  │
│  - axios (HTTP client)                          │
│  - dotenv (environment variables)               │
│                                                 │
│  Exports:                                       │
│  - getUser(username)                            │
│  - getUserRepos(username, limit)                │
│  - getRepo(username, repoName)                  │
│  - getRepoIssues(username, repoName, state)     │
│  - getRepoPRs(username, repoName, state)        │
└─────────────────────────────────────────────────┘
         ▲                           ▲
         │                           │
         │                           │
┌────────┴───────────┐    ┌─────────┴──────────┐
│  bot.js            │    │  app.js            │
├────────────────────┤    ├────────────────────┤
│ Dependencies:      │    │ Dependencies:      │
│ - discord.js       │    │ - express          │
│ - dotenv           │    │ - dotenv           │
│ - github service   │    │ - github service   │
│                    │    │                    │
│ Commands:          │    │ Endpoints:         │
│ - !ping            │    │ - GET /api/user    │
│ - !ghuser          │    │ - GET /api/repos   │
│ - !ghrepos         │    │ - GET /api/repo    │
│ - !ghrepo          │    │ - GET .../issues   │
│ - !ghissues        │    │ - GET .../pulls    │
│ - !ghprs           │    │                    │
│ - !ghhelp          │    │                    │
└────────────────────┘    └────────────────────┘
```

## Benefits of This Architecture

### 1. Single Source of Truth

```
GitHub API Logic
       ↓
services/github.js (ONE PLACE)
       ↓
    ┌──┴──┐
    ↓     ↓
 bot.js  app.js
```

### 2. Easy Maintenance

- Update GitHub logic once
- Both bot and API automatically updated
- Consistent error handling

### 3. Scalability

```
Future Additions:
├── services/
│   ├── github.js      ✅ Existing
│   ├── gitlab.js      ➕ Easy to add
│   ├── bitbucket.js   ➕ Easy to add
│   └── database.js    ➕ Easy to add
```

### 4. Testability

```
Unit Tests:
├── services/github.test.js    (Test API logic)
├── bot.test.js                (Test bot commands)
└── app.test.js                (Test API endpoints)
```

## Environment Configuration

```
.env File
    │
    ├─► DISCORD_TOKEN ────► bot.js
    │
    └─► GITHUB_API_KEY ──► services/github.js
                                │
                                ├─► bot.js (via service)
                                └─► app.js (via service)
```

## Response Format

### GitHub Service Response

```javascript
// Success
{
  success: true,
  data: { /* GitHub API response */ }
}

// Error
{
  success: false,
  error: "Error message"
}
```

### API Endpoint Response

```javascript
// Success
{
  username: "torvalds",
  name: "Linus Torvalds",
  bio: "...",
  // ... more fields
}

// Error
{
  error: "User not found"
}
```

### Discord Bot Response

```
Rich Embedded Message with:
- Title
- Description
- Fields
- Thumbnail/Image
- Timestamp
- Color
```

## Technology Stack

```
┌─────────────────────────────────────┐
│     Application Layer               │
├─────────────────────────────────────┤
│ • Discord Bot (discord.js v14)      │
│ • REST API (Express v5)             │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│     Service Layer                   │
├─────────────────────────────────────┤
│ • GitHub Service (axios)            │
│ • Reusable functions                │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│     External APIs                   │
├─────────────────────────────────────┤
│ • GitHub REST API v3                │
│ • Discord Gateway API               │
└─────────────────────────────────────┘
```

## File Structure Details

```
DoBy/
│
├── services/              # Shared service modules
│   └── github.js         # GitHub API integration
│                         # (Used by both bot & API)
│
├── bot.js                # Discord bot application
│                         # Handles Discord commands
│                         # Uses github service
│
├── app.js                # Express REST API server
│                         # Provides HTTP endpoints
│                         # Uses github service
│
├── package.json          # Dependencies & scripts
├── .env                  # Environment variables
├── .env.example          # Example env file
├── README.md             # Full documentation
├── PROJECT_STATUS.md     # Current status
└── ARCHITECTURE.md       # This file
```
