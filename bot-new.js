import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";
import {
  getUser,
  getUserRepos,
  getRepo,
  getRepoIssues,
  getRepoPRs,
} from "./services/github.js";

dotenv.config();

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // needed to read messages
  ],
});

// When the bot is ready
client.once("ready", () => {
  console.log(`✅ Discord Bot logged in as ${client.user.tag}!`);
});

// Listen to messages
client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // ignore bot messages

  const args = message.content.split(" ");
  const command = args[0].toLowerCase();

  // Ping command
  if (command === "!ping") {
    message.channel.send("Pong! 🏓");
  }

  // Get GitHub user info
  if (command === "!ghuser") {
    const username = args[1];
    if (!username) {
      return message.reply(
        "Please provide a username! Usage: `!ghuser <username>`"
      );
    }

    const result = await getUser(username);
    if (result.success) {
      const user = result.data;
      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${user.login}`)
        .setURL(user.html_url)
        .setThumbnail(user.avatar_url)
        .addFields(
          { name: "Name", value: user.name || "N/A", inline: true },
          {
            name: "Public Repos",
            value: user.public_repos.toString(),
            inline: true,
          },
          { name: "Followers", value: user.followers.toString(), inline: true },
          { name: "Following", value: user.following.toString(), inline: true },
          { name: "Bio", value: user.bio || "No bio available" }
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      message.reply(`❌ ${result.error}`);
    }
  }

  // Get user's repositories
  if (command === "!ghrepos") {
    const username = args[1];
    if (!username) {
      return message.reply(
        "Please provide a username! Usage: `!ghrepos <username>`"
      );
    }

    const result = await getUserRepos(username, 5);
    if (result.success) {
      const repos = result.data;

      if (repos.length === 0) {
        return message.reply(`${username} has no public repositories.`);
      }

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`📚 ${username}'s Recent Repositories`)
        .setURL(`https://github.com/${username}?tab=repositories`)
        .setDescription(
          repos
            .map(
              (repo) =>
                `**[${repo.name}](${repo.html_url})**\n${
                  repo.description || "No description"
                }\n⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 📝 ${
                  repo.language || "N/A"
                }`
            )
            .join("\n\n")
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      message.reply(`❌ ${result.error}`);
    }
  }

  // Get repository info
  if (command === "!ghrepo") {
    const username = args[1];
    const repoName = args[2];
    if (!username || !repoName) {
      return message.reply(
        "Please provide username and repo name! Usage: `!ghrepo <username> <repo>`"
      );
    }

    const result = await getRepo(username, repoName);
    if (result.success) {
      const repo = result.data;
      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`📦 ${repo.full_name}`)
        .setURL(repo.html_url)
        .setDescription(repo.description || "No description")
        .addFields(
          {
            name: "⭐ Stars",
            value: repo.stargazers_count.toString(),
            inline: true,
          },
          {
            name: "🍴 Forks",
            value: repo.forks_count.toString(),
            inline: true,
          },
          {
            name: "👀 Watchers",
            value: repo.watchers_count.toString(),
            inline: true,
          },
          { name: "📝 Language", value: repo.language || "N/A", inline: true },
          {
            name: "📅 Created",
            value: new Date(repo.created_at).toLocaleDateString(),
            inline: true,
          },
          {
            name: "🔄 Updated",
            value: new Date(repo.updated_at).toLocaleDateString(),
            inline: true,
          },
          {
            name: "🐛 Open Issues",
            value: repo.open_issues_count.toString(),
            inline: true,
          },
          {
            name: "📜 License",
            value: repo.license?.name || "None",
            inline: true,
          }
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      message.reply(`❌ ${result.error}`);
    }
  }

  // Get repository issues
  if (command === "!ghissues") {
    const username = args[1];
    const repoName = args[2];
    if (!username || !repoName) {
      return message.reply(
        "Please provide username and repo name! Usage: `!ghissues <username> <repo>`"
      );
    }

    const result = await getRepoIssues(username, repoName);
    if (result.success) {
      const issues = result.data;

      if (issues.length === 0) {
        return message.reply(`No open issues found in ${username}/${repoName}`);
      }

      const embed = new EmbedBuilder()
        .setColor(0xff6b6b)
        .setTitle(`🐛 Issues in ${username}/${repoName}`)
        .setURL(`https://github.com/${username}/${repoName}/issues`)
        .setDescription(
          issues
            .slice(0, 5)
            .map(
              (issue) =>
                `**#${issue.number}** [${issue.title}](${issue.html_url})\nBy ${issue.user.login}`
            )
            .join("\n\n")
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      message.reply(`❌ ${result.error}`);
    }
  }

  // Get repository pull requests
  if (command === "!ghprs") {
    const username = args[1];
    const repoName = args[2];
    if (!username || !repoName) {
      return message.reply(
        "Please provide username and repo name! Usage: `!ghprs <username> <repo>`"
      );
    }

    const result = await getRepoPRs(username, repoName);
    if (result.success) {
      const prs = result.data;

      if (prs.length === 0) {
        return message.reply(
          `No open pull requests found in ${username}/${repoName}`
        );
      }

      const embed = new EmbedBuilder()
        .setColor(0x4ecdc4)
        .setTitle(`🔀 Pull Requests in ${username}/${repoName}`)
        .setURL(`https://github.com/${username}/${repoName}/pulls`)
        .setDescription(
          prs
            .slice(0, 5)
            .map(
              (pr) =>
                `**#${pr.number}** [${pr.title}](${pr.html_url})\nBy ${pr.user.login}`
            )
            .join("\n\n")
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      message.reply(`❌ ${result.error}`);
    }
  }

  // Help command
  if (command === "!ghhelp") {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("🤖 GitHub Bot Commands")
      .setDescription("Here are all available GitHub commands:")
      .addFields(
        { name: "!ping", value: "Test if bot is responsive" },
        { name: "!ghuser <username>", value: "Get GitHub user information" },
        {
          name: "!ghrepos <username>",
          value: "Get user's recent repositories (top 5)",
        },
        {
          name: "!ghrepo <username> <repo>",
          value: "Get detailed repository information",
        },
        {
          name: "!ghissues <username> <repo>",
          value: "Get open issues in a repository",
        },
        {
          name: "!ghprs <username> <repo>",
          value: "Get open pull requests in a repository",
        },
        { name: "!ghhelp", value: "Show this help message" }
      )
      .setFooter({ text: "GitHub Discord Bot" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
});

// Log in
client.login(process.env.DISCORD_TOKEN);
