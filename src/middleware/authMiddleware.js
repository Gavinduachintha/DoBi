import dotenv from "dotenv";
dotenv.config();

export const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (token !== process.env.GITHUB_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
