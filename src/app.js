import Router from "./routes/urlRoutes.js";
import express from "express";
const app = express();
app.use(express.json());
app.use("/", Router);
export default app;
