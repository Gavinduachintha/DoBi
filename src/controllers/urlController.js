import dotenv from "dotenv";
import axios from "axios";
import { getUserRepo } from "../services/githubService.js";
dotenv.config();

export const healthCheck = (req, res) => {
  res.status(200).send("Server is healthy");
};

export const checkGithubConnection = async (req, res) => {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    });
    // return response.data.login;
    return response.data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const displayUser = async (req, res) => {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    });
    res.status(200).json(response.data); // Return the full user object or specific fields
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const displayRepos = async (req, res) => {
  try {
    const repos = await getUserRepo();
    res.status(200).json({ count: repos.length, repositories: repos }); // Return the list of repositories
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
