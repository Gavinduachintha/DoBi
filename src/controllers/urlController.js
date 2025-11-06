import dotenv from "dotenv";
import discord from "discord.js";
import app from "../app";
dotenv.config();

export const healthCheck = (req, res) => {
  res.send("App is running");
};

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET


const client = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMessages,
  ],
});
client.on("messageCreate", (message) => {
  if (message.author.bot) return; // avoid replying to bots
  message.channel.send("Received the message!");
});

export const login = (req, res) => {
  const discordId = req.query.discord_id;
  const redirectURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user&state=${discordId}`;
};

client.login(process.env.DISCORD_TOKEN);
