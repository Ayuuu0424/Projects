import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.Connection.config.js";
import AuthRouter from "./src/routers/auth.route.js";
import PublicRouter from "./src/routers/contact.route.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);

//Default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my Cravings Project" });
});

//Default Error Handler

app.use((err, req, res, next) => {
  const ErrMessage = err.message || "Internal Server Error";
  const ErrStatusCode = err.statusCode || 500;

  res.status(ErrStatusCode).json({ message: ErrMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started on port:", port);
  connectDB();
});
