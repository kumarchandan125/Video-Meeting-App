import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";
import { handelClerkWebhook } from "./controllers/webhookController.js";

const app = express();
//connect to neon and initialize tables
initDB();

const allowedOrgins = process.env.ORIGINS.split(",");
app.use(
  cors({
    origin: allowedOrgins,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  handelClerkWebhook,
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Api is live!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
