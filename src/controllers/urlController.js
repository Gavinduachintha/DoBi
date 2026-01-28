import dotenv from "dotenv";
import axios from "axios";
import jwt from "jsonwebtoken";

import { githubTokenStore } from "../store/tokenStore.js";
dotenv.config();

export const healthCheck = (req, res) => {
  res.status(200).send("Server is healthy");
};
export const githubLogin = (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const redirectURI = "http://localhost:3000/auth/github/callback";
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
  const jwtPayload = {
    id: user.data.id,
    username: user.data.login,
  };

  const appToken = jwt.sign(jwtPayload, process.env.JSON_WEB_TOKEN, {
    expiresIn: "1h",
  });
  githubTokenStore.set(user.data.id, token);

  res.json({
    message: "Authentication successful",
    user: {
      token: appToken,
      id: user.data.id,
      username: user.data.login,
      userAvater: user.data.avatar_url,
    },
  });
};

export const displayUser = async (req, res) => {
  const token = githubTokenStore.get(req.user.id);
  if (!token) {
    return res
      .status(401)
      .json({ message: "GitHub token not found. Please login again." });
  }
  try {
    const currentUser = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json(currentUser.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
};
