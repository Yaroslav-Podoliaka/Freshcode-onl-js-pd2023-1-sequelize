require("dotenv").config();
import express from "express";
import cors from "cors";
import router from "./routers";
const db = require("./db/models");
import { errorHandler } from "./middleware";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(
  errorHandler.validationErrorHandler,
  errorHandler.sequelizeErrorHandler,
  errorHandler.errorHandler
);
app.use("/api", router);

const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      `Connection with << ${process.env.DB_NAME.toUpperCase()} >> has been established successfully`
    );
  } catch (error) {
    console.log(console.error("Unable to connect to DB: ", error.message));
  }
};
dbCheck();

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
