import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Create GitHub API client
const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.GITHUB_API_KEY}`,
    Accept: "application/vnd.github+json",
  },
});

// Get user information
export async function getUser(username) {
  try {
    const response = await github.get(`/users/${username}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || "User not found",
    };
  }
}

// Get user's repositories
export async function getUserRepos(username, limit = 5) {
  try {
    const response = await github.get(`/users/${username}/repos`, {
      params: { sort: "updated", per_page: limit },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error fetching repos:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || "Unable to fetch repositories",
    };
  }
}

// Get specific repository information
export async function getRepo(username, repoName) {
  try {
    const response = await github.get(`/repos/${username}/${repoName}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error fetching repo:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || "Repository not found",
    };
  }
}

// Get repository issues
export async function getRepoIssues(username, repoName, state = "open") {
  try {
    const response = await github.get(`/repos/${username}/${repoName}/issues`, {
      params: { state, per_page: 10 },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error fetching issues:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || "Unable to fetch issues",
    };
  }
}

// Get repository pull requests
export async function getRepoPRs(username, repoName, state = "open") {
  try {
    const response = await github.get(`/repos/${username}/${repoName}/pulls`, {
      params: { state, per_page: 10 },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching PRs:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Unable to fetch pull requests",
    };
  }
}

export default github;
