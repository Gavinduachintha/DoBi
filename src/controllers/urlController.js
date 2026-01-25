import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export const healthCheck = (req, res) => {
  res.status(200).send("Server is healthy");
};

export const login = async (req, res) => {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    });
    res.status(200).json(response.data);
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
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    });
    const data = response.data;
    res.status(200).json({ count: data.length, repositories: data }); // Return the list of repositories
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
