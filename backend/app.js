import express from "express";

import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
// import connectToPostgres from './database/postgres.js';
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express(); // creating an express app instance - actual web server

app.use(
  cors({
    origin: "http://localhost:3000", // frontend domain
  })
);

app.use(express.json()); // handle json data sent in request
app.use(express.urlencoded({ extend: false })); // process the form data sent via HTML forms in simple format
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter); // use which api
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  // sets up a GET route
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  // starts the server on port 3000
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`
  );

  await connectToDatabase();

  // connectToPostgres.connect().then(() => console.log('PostgreSQL connected!'));
});

export default app; // exports it so it can be imported and used elsewhere
