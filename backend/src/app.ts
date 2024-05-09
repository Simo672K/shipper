import express from "express";
import router from "./routes";
import loggingMiddleware from "./middleware/log.middleware";
// import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(loggingMiddleware);
// app.use(cookieParser());
app.use(router);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("[*] App running on port :3000...");
});
