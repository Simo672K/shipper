import express from "express";
import userRouter from "./routes/auth";

const app = express();

app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("[*] App running on port :3000...");
});
