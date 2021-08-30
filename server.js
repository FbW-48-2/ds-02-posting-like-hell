import express from "express";
import userRouter from "../ds-02-posting-like-hell/router/expressRouter.js";
const app = express();

app.use(express.json());
app.use("/", userRouter);

const PORT = "5000";
app.listen("/", () => {
  console.log("api initialized");
});
