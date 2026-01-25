# DoBi - Discord Bot with GitHub Integration

<div align="center">
  <h3>A powerful Discord bot that seamlessly integrates with GitHub</h3>
  <p>Monitor your GitHub repositories, check your profile status, and manage GitHub data directly from Discord!</p>
</div>

---

## 📖 Table of Contents

- [What is DoBi?](#what-is-dobi)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Discord Bot Commands](#discord-bot-commands)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

---

## 🤖 What is DoBi?

DoBi is a Node.js-based application that combines a Discord bot with a RESTful web server. It enables seamless integration between Discord and GitHub, allowing users to interact with their GitHub data directly from Discord channels. The application features:

- **Discord Bot**: Responds to commands in Discord servers to fetch GitHub repository information and user profiles
- **RESTful API**: Provides HTTP endpoints for GitHub data access with Bearer token authentication
- **GitHub Integration**: Connects to GitHub API to retrieve user data, repositories, and profile information

The project is hosted on GitHub at [Gavinduachintha/DoBi](https://github.com/Gavinduachintha/DoBi).

---

## ✨ Features

- 🔍 **Repository Listing**: Fetch and display all your GitHub repositories with direct links
- 👤 **GitHub Profile Status**: View your GitHub profile information including bio, followers, and public repos
- 🏓 **Health Monitoring**: Built-in health check endpoint for monitoring server status
- 🔐 **Secure Authentication**: Bearer token-based authentication for API endpoints
- 💬 **Discord Commands**: Interactive bot commands for easy GitHub data access
- 🎨 **Rich Embeds**: Beautiful Discord embeds with formatted GitHub information

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js (ES Modules)
- **Web Framework**: Express.js v5.1.0
- **Discord Library**: discord.js v14.25.1
- **HTTP Client**: Axios v1.13.0

### Key Dependencies
- **dotenv**: Environment variable management
- **body-parser**: Request body parsing middleware
- **express**: Web application framework

### APIs
- **Discord API**: For bot functionality and message handling
- **GitHub REST API**: For fetching user and repository data

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed and configured:

- **Node.js**: Version 16.x or higher (ES Modules support required)
- **npm**: Version 7.x or higher
- **Discord Bot Token**: Create a bot at [Discord Developer Portal](https://discord.com/developers/applications)
- **GitHub Personal Access Token**: Generate one at [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)

### Discord Bot Permissions Required
- Read Messages/View Channels
- Send Messages
- Embed Links
- Read Message History

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Gavinduachintha/DoBi.git
cd DoBi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DISCORD_TOKEN=your_discord_bot_token_here
GITHUB_API_KEY=your_github_personal_access_token_here
```

### 4. Start the Application

```bash
node server.js
```

The application will start on port 3000 and you should see:
```
App listening on port 3000!
Logged in as YourBot#1234
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DISCORD_TOKEN` | Your Discord bot token from Discord Developer Portal | ✅ Yes | `MTIzNDU2Nzg5MDEyMzQ1Njc4.GAbCdE.fGhIjKlMnOpQrStUvWxYz` |
| `GITHUB_API_KEY` | GitHub Personal Access Token with repo access | ✅ Yes | `ghp_xxxxxxxxxxxxxxxxxxxx` |

### Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" section
4. Click "Add Bot"
5. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
   - Server Members Intent (optional)
6. Copy the bot token and add it to your `.env` file
7. Go to OAuth2 > URL Generator
8. Select scopes: `bot`
9. Select permissions: `Send Messages`, `Embed Links`, `Read Message History`
10. Copy the generated URL and open it in your browser to invite the bot to your server

### GitHub Token Setup

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "DoBi Discord Bot")
4. Select scopes: `repo`, `read:user`
5. Click "Generate token"
6. Copy the token immediately and add it to your `.env` file

---

## 🌐 Deployment

### Deploy to Production Server

#### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name dobi

# Save the process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

#### Using Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t dobi .
docker run -d -p 3000:3000 --env-file .env --name dobi dobi
```

### Deploy to Cloud Platforms

#### Heroku

```bash
# Install Heroku CLI and login
heroku login

# Create a new Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set DISCORD_TOKEN=your_token
heroku config:set GITHUB_API_KEY=your_key

# Deploy
git push heroku main
```

#### Railway/Render

1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically on push

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

**Description**: Check if the server is running

**Response**:
```
Server is healthy
```

---

#### 2. Check GitHub Connection
```http
GET /checkGithubConnection
```

**Description**: Verify GitHub API connection and get authenticated user info

**Headers**:
```
Authorization: Bearer YOUR_GITHUB_TOKEN
```

**Response**:
```json
{
  "login": "username",
  "id": 12345678,
  "avatar_url": "https://avatars.githubusercontent.com/u/12345678",
  "html_url": "https://github.com/username",
  "bio": "Developer | Open Source Enthusiast",
  "public_repos": 42,
  "followers": 100,
  "following": 50
}
```

---

#### 3. Display User Profile
```http
GET /displayUser
```

**Description**: Get detailed GitHub user profile information

**Headers**:
```
Authorization: Bearer YOUR_GITHUB_TOKEN
```

**Response**: Same as Check GitHub Connection

---

#### 4. Display Repositories
```http
GET /displayRepos
```

**Description**: Fetch all repositories for the authenticated user

**Headers**:
```
Authorization: Bearer YOUR_GITHUB_TOKEN
```

**Response**:
```json
{
  "count": 42,
  "repositories": [
    {
      "id": 123456,
      "name": "awesome-project",
      "full_name": "username/awesome-project",
      "html_url": "https://github.com/username/awesome-project",
      "description": "An awesome project",
      "private": false,
      "stargazers_count": 100,
      "language": "JavaScript"
    }
  ]
}
```

---

## 💬 Discord Bot Commands

All commands should be used in channels where the bot has permission to read and send messages.

### Available Commands

#### `!ping`
Test if the bot is responsive

**Example**:
```
User: !ping
Bot: Pong!
```

---

#### `!repos`
Display your GitHub repositories (up to 10 most recent)

**Example**:
```
User: !repos
Bot: [Embed showing 📦 GitHub Repositories with list of repos and links]
```

**Features**:
- Shows repository count
- Displays up to 10 repositories
- Provides direct links to each repository
- Formatted as a rich Discord embed

---

#### `!status`
Check your GitHub profile status and statistics

**Example**:
```
User: !status
Bot: [Embed showing ✅ GitHub Login Status with profile info]
```

**Features**:
- Displays GitHub username
- Shows public repository count
- Shows follower count
- Displays bio
- Includes profile avatar
- Provides link to GitHub profile

---

## 📁 Project Structure

```
DoBi/
├── src/
│   ├── app.js                    # Express application setup
│   ├── bot.js                    # Discord bot implementation
│   ├── controllers/
│   │   └── urlController.js      # Request handlers for API endpoints
│   ├── middleware/
│   │   └── authMiddleware.js     # Bearer token authentication
│   ├── routes/
│   │   └── urlRoutes.js          # API route definitions
│   └── services/
│       └── githubService.js      # GitHub API integration
├── server.js                     # Application entry point
├── package.json                  # Project dependencies and scripts
├── .env                          # Environment variables (not in repo)
├── .gitignore                    # Git ignore rules
└── README.md                     # Project documentation
```

### Key Files

- **server.js**: Entry point that starts the Express server and Discord bot
- **src/app.js**: Configures Express application with middleware and routes
- **src/bot.js**: Handles Discord bot events and commands
- **src/controllers/urlController.js**: Business logic for API endpoints
- **src/middleware/authMiddleware.js**: Authentication middleware for protected routes
- **src/services/githubService.js**: Service layer for GitHub API calls

---

## 📚 Usage Examples

### Using the Discord Bot

1. Invite the bot to your Discord server using the OAuth2 URL
2. In any channel where the bot has permissions, type:
   ```
   !ping
   ```
   You should receive "Pong!" as a response

3. Check your GitHub status:
   ```
   !status
   ```

4. List your repositories:
   ```
   !repos
   ```

### Using the REST API

#### Example with cURL

```bash
# Health check
curl http://localhost:3000/

# Get user profile
curl -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
     http://localhost:3000/displayUser

# Get repositories
curl -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
     http://localhost:3000/displayRepos
```

#### Example with JavaScript (fetch)

```javascript
const token = 'YOUR_GITHUB_TOKEN';

// Fetch user profile
fetch('http://localhost:3000/displayUser', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data));

// Fetch repositories
fetch('http://localhost:3000/displayRepos', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate documentation.

---

## 📄 License

This project is licensed under the ISC License.

---

## 🔗 Links

- **Repository**: [https://github.com/Gavinduachintha/DoBi](https://github.com/Gavinduachintha/DoBi)
- **Issues**: [https://github.com/Gavinduachintha/DoBi/issues](https://github.com/Gavinduachintha/DoBi/issues)
- **Discord.js Documentation**: [https://discord.js.org/](https://discord.js.org/)
- **GitHub API Documentation**: [https://docs.github.com/en/rest](https://docs.github.com/en/rest)

---

<div align="center">
  <p>Made with ❤️ by the Gavi</p>
  <p>⭐ Star this repo if you find it useful!</p>
</div>
