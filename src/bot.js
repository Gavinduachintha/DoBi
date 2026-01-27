import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { getUserRepo } from "./services/githubService.js";
import {
  // checkGithubConnection,
  githubLogin,
} from "./controllers/urlController.js";
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
  }
  if (message.content === "!login") {
    try {
      if (message.content === "!login") {
        const loginUrl = `${process.env.BASE_URL}/auth/github`;

        message.reply(
          "🔐 **Login with GitHub**\n" +
            "Click the link below to connect your GitHub account:\n\n" +
            `${loginUrl}`,
        );
      }
    } catch (error) {
      return message.reply("❌ Failed to generate login URL.");
    }
  }
  if (message.content === "!repos") {
    try {
      const repos = await getUserRepo();

      if (!repos.length) {
        return message.reply("You have no repositories.");
      }

      const embed = new EmbedBuilder()
        .setTitle("📦 GitHub Repositories")
        .setDescription(`You have **${repos.length}** repositories`)
        .setColor(0x24292e) // GitHub dark
        .setFooter({ text: "Fetched from GitHub API" })
        .setTimestamp();

      repos.slice(0, 10).forEach((repo) => {
        embed.addFields({
          name: repo.name,
          value: `[View Repo](${repo.html_url})`,
          inline: false,
        });
      });

      message.reply({ embeds: [embed] });
    } catch (error) {
      message.reply("❌ Failed to fetch repositories.");
    }
  }

  if (message.content === "!status") {
    try {
      const user = await checkGithubConnection();

      const embed = new EmbedBuilder()
        .setTitle("✅ GitHub Login Status")
        .setURL(user.html_url)
        .setColor(0x2ea44f) // GitHub green
        .setThumbnail(user.avatar_url)
        .addFields(
          { name: "👤 Username", value: user.login, inline: true },
          {
            name: "📦 Public Repos",
            value: `${user.public_repos}`,
            inline: true,
          },
          { name: "👥 Followers", value: `${user.followers}`, inline: true },
          {
            name: "🧠 Bio",
            value: user.bio || "No bio available",
            inline: false,
          },
        )
        .setFooter({ text: "Connected to GitHub" })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      message.reply("❌ Not connected to GitHub.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
