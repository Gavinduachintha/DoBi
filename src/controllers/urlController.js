import dotenv from "dotenv";
import discord from "discord.js";
dotenv.config();

export const healthCheck = (req, res) => {
  res.send("App is running");
};

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

client.login(process.env.DISCORD_TOKEN);
