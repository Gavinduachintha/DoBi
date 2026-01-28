import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JSON_WEB_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token or Expired One" });
  }
};
