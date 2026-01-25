import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import { healthCheck,checkGithubConnection,displayUser,displayRepos} from "../controllers/urlController.js";

const Router = express.Router();
Router.get("/", healthCheck);
Router.get("/checkGithubConnection",authUser,checkGithubConnection)
Router.get("/displayUser",authUser,displayUser)
Router.get("/displayRepos",authUser,displayRepos)

export default Router;
