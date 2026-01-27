import dotenv from "dotenv";
import axios from "axios";
import { getUserRepo } from "../services/githubService.js";
dotenv.config();

export const healthCheck = (req, res) => {
  res.status(200).send("Server is healthy");
};
export const githubLogin = (req, res) => {
  const clientId = process.env.CLIENT_ID;
const redirectURI = `${process.env.BASE_URL}/auth/github/callback`;
  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectURI}` +
    `&scope=repo user`;

  res.redirect(url);
};

export const githubCallback = async (req, res) => {
  const { code } = req.query;
  const tokenRespons = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  const token = tokenRespons.data.access_token;
  const user = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  res.json({ githubID: user.data.id, username: user.data.login });
};
