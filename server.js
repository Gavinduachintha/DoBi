import app from "./src/app.js";
import dotenv from "dotenv";
import "./src/bot.js";
dotenv.config();
const port = 3000;
app.listen(port, () => {
  console.log("App listening on port 3000!");
});
