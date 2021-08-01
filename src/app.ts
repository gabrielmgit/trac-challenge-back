import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();

class App {
  app: express.Application;
  PORT: number;

  constructor() {
    this.PORT = this.getPort();

    this.app = express();
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());

    this.database();
    this.routes();

    this.app.listen(this.PORT, () => {
      console.log(`Listening on port ${this.PORT}`);
    });
  }

  getPort(): number {
    if (!process.env.PORT) {
      process.exit(1);
    }
    return parseInt(process.env.PORT as string, 10);
  }

  database() {
    if (!process.env.DB_URL) {
      process.exit(1);
    }

    const DB_URL = process.env.DB_URL;

    mongoose
      .connect(DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected..."))
      .catch((err: any) => console.log(err));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App();
