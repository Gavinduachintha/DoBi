import express from "express";
import { healthCheck,login} from "../controllers/urlController.js";

const Router = express.Router();
Router.get("/", healthCheck);
Router.get("/login",login)

export default Router;
