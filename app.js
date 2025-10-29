import express from "express";
import dotenv from "dotenv";
import {
  getUser,
  getUserRepos,
  getRepo,
  getRepoIssues,
  getRepoPRs,
} from "./services/github.js";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("GitHub API Server is running 🚀");
});

// Get user information
app.get("/api/user", async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: "Please provide a username" });
  }

  const result = await getUser(username);
  if (result.success) {
    res.json({
      username: result.data.login,
      name: result.data.name,
      bio: result.data.bio,
      avatar_url: result.data.avatar_url,
      public_repos: result.data.public_repos,
      followers: result.data.followers,
      following: result.data.following,
      html_url: result.data.html_url,
    });
  } else {
    res.status(404).json({ error: result.error });
  }
});

// Get user's repositories
app.get("/api/repos/:username", async (req, res) => {
  const username = req.params.username;
  const limit = parseInt(req.query.limit) || 10;

  const result = await getUserRepos(username, limit);
  if (result.success) {
    const repos = result.data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
    }));
    res.json(repos);
  } else {
    res.status(404).json({ error: result.error });
  }
});

// Get specific repository information
app.get("/api/repo/:username/:repoName", async (req, res) => {
  const { username, repoName } = req.params;

  const result = await getRepo(username, repoName);
  if (result.success) {
    const repo = result.data;
    res.json({
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      open_issues: repo.open_issues_count,
      license: repo.license?.name || null,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
    });
  } else {
    res.status(404).json({ error: result.error });
  }
});

// Get repository issues
app.get("/api/repo/:username/:repoName/issues", async (req, res) => {
  const { username, repoName } = req.params;
  const state = req.query.state || "open";

  const result = await getRepoIssues(username, repoName, state);
  if (result.success) {
    const issues = result.data.map((issue) => ({
      number: issue.number,
      title: issue.title,
      state: issue.state,
      user: issue.user.login,
      created_at: issue.created_at,
      url: issue.html_url,
    }));
    res.json(issues);
  } else {
    res.status(404).json({ error: result.error });
  }
});

// Get repository pull requests
app.get("/api/repo/:username/:repoName/pulls", async (req, res) => {
  const { username, repoName } = req.params;
  const state = req.query.state || "open";

  const result = await getRepoPRs(username, repoName, state);
  if (result.success) {
    const prs = result.data.map((pr) => ({
      number: pr.number,
      title: pr.title,
      state: pr.state,
      user: pr.user.login,
      created_at: pr.created_at,
      url: pr.html_url,
    }));
    res.json(prs);
  } else {
    res.status(404).json({ error: result.error });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
