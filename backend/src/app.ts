import express from "express";
import type { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import v1Router from "../src/routes/v1/index.js";

const app: Express = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from backend 🚀");
});

// APIs
app.use("/api/v1", v1Router);

// Error handling middleware
app.use(errorMiddleware);

export default app;
