import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// get data from json
app.use(express.json({ limit: "30kb" }));
// get data from url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import teamsRouter from "./routes/teams.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/teams", teamsRouter);





export { app };