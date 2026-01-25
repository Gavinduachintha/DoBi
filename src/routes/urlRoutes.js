import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import { healthCheck,login,displayUser,displayRepos} from "../controllers/urlController.js";

const Router = express.Router();
Router.get("/", healthCheck);
Router.get("/login",authUser,login)
Router.get("/displayUser",authUser,displayUser)
Router.get("/displayRepos",authUser,displayRepos)

export default Router;
