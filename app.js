import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const app = express();
const port = 3000;
dotenv.config();

app.get("/", (req, res) => {
  res.send("App is running");
});

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.GITHUB_API_KEY}`,
    Accept: "application/vnd.github+json",
  },
});

app.get("/user", async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(404).json({ error: "Pls enter the username" });
  }
  try {
    const response = await github.get(`/users/${username}`);
    res.json({ response: response.data.id });
    console.log(response.data.id);
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
  }
});

app.get("/repos/:username", async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(404).json({ error: "Username required" });
  }
  try {
    const response = await github.get(`/users/${username}/repos`);
    const repos = response.data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      updated_at: repo.updated_at,
    }));
    res.json(repos);
  } catch (error) {
    console.error("Error: ", error.response?.data || error.message);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

