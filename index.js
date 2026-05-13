import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import router from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestTime } from "./middleware/requestTime.js";

// Load environment variables from .env file
dotenv.config();

//creating express app
const app = express();

const PORT = process.env.PORT;

//middleware to parse JSON bodies
app.use(express.json());
//middleware for logging HTTP requests
app.use(morgan("dev"));
//middleware to add request time
app.use(requestTime);


//routes with request and response
app.use("/users", router);

//middleware for handling errors - this should be registered after all routes, so that it can catch any errors thrown in the route handlers
app.use(errorHandler);

//start the server
app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} is running on http://localhost:${PORT}`);
});