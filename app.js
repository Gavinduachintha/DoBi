import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.GITHUB_API_KEY}`,
    Accept: "application/vnd.github+json",
  },
});

const getUser = async (userName) => {
  try {
    const response = await github.get(`/users/${userName}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
  }
};

getUser("Gavinduachintha");

const getRepos = async (userName) => {
  try {
    const response = await axios.get(`/users/${userName}/repos`);
    response.data.foreach((repo) => console.log(repo.name));
  } catch (error) {
    console.error("Error: ",error.response?.data||error.message);
    
  }
};

getRepos("Gavinduachintha")