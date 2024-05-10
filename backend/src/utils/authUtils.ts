import jwt from "jsonwebtoken";
import { config } from "dotenv";

// dotenv init
config();

function genrateAccessToken(name: string, email: string, role: string): string {
  const accessToken = jwt.sign(
    { name, email, role },
    process.env.ACCESS_TOKEN!,
    { expiresIn: "15s" }
  );

  return accessToken;
}

function refreshAccessToken(name: string, email: string, role: string) {
  const refreshToken = jwt.sign(
    { name, email, role },
    process.env.REFRESH_TOKEN!
  );
  return refreshToken;
}

export { genrateAccessToken, refreshAccessToken };
