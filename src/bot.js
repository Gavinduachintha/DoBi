import { Client, GatewayIntentBits } from "discord.js";
import { login,displayRepos } from "./controllers/urlController.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "!ping") {
    message.reply("Pong!");
  } else if (message.content.startsWith("!repos")) {
    try {
      // Simulate a request or call your controller logic
      const repos = await displayRepos(
        {
          /* mock req */
        },
        { json: (data) => data }
      );
      message.reply(`You have ${repos.count} repositories.`);
    } catch (error) {
      message.reply("Error fetching repos.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
