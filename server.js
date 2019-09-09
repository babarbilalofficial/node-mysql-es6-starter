import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import internalIP from "internal-ip";
import logger from "./modules/logger";
import morgan from "morgan";
import config from "./config";
import Routes from "./modules/routes";
import connectToMySQL from "./db";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const port = config.serverPort;
logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

(async () => {
  const ip = await internalIP.v4();
  swaggerDocument.host = `${ip}:${port}`;
  swaggerDocument.basePath = config.apiBaseURL;
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
})();

app.use("/api", Routes);

//Index route
app.get("/", (req, res) => {
  res.status(401).send("Unauthorized!");
});

app.listen(port, () => {
  console.log("Server started on port", port);
});
