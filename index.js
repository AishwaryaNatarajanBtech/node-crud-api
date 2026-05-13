import express from "express";

import router from "./routes/userRoutes.js";

//creating express app
const app = express();

const PORT = 3000;

//middleware to parse JSON bodies
app.use(express.json());


//routes with request and response
app.use("/users", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});