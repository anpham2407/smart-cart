import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import mongoose from "mongoose";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import filesRouter from "./routes/file";
import JobQueue from "./job";
import path from "path";

const limiter = rateLimit({
  windowMs: 1000, // 1 minutes
  max: 200, // limit each IP to 100 requests per windowMs
});

// db connection
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log("mongo connection error");
    throw err;
  });

const app = express();
app.use("/v1/static", express.static(path.join(__dirname, "/storage")));
app.use(
  "/.well-known",
  express.static(path.join(__dirname, "/pki-validation"))
);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/files", filesRouter);

JobQueue.startProcess();

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
