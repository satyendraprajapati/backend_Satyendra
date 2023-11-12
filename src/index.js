import express from "express";
import dotenv from "dotenv";
dotenv.config();

import dbConnection from "./dbConnection/dbConnection.js";
const app = express();
const PORT = process.env.PORT;
dbConnection()
  .then(() => {
    app.listen(PORT || 3000, () => {
      console.log(`Server is runnin on port number ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
