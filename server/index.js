import "dotenv/config";
import express from "express";
import compression from "compression";
import next from "next";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import routes from "./routes";
import connectToDatabase from "&/utils/db";

const { PORT, NODE_ENV, ADMIN_SESSION } = process.env;
const dev = NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(helmet());
  server.use(cookieParser(ADMIN_SESSION));
  server.use(compression());
  server.use(express.json());

  server.get("/_next/*", (req, res) => {
    handler(req, res);
  });

  server.use("/api", routes);

  server.get("*", (req, res) => {
    return handler(req, res);
  });

  startServer();

  function startServer() {
    server.listen(PORT, async (error) => {
      if (error) {
        return console.error(error);
      } else {
        await connectToDatabase();
        return console.info(`Server running on ${PORT} [${NODE_ENV}]`);
      }
    });
  }
});
