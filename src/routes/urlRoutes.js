import express from "express";
import { healthCheck} from "../controllers/urlController.js";

const Router = express.Router();
Router.get("/", healthCheck);


export default Router;
