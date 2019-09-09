import mysql from "mysql";
import util from "util";
import logger from "../modules/logger";
import config from "../config";

// Mongoose.Promise = global.Promise;

const dbcon = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPass,
  database: config.dbName
});

dbcon.connect((err) => {
  if (err) {
    logger.error("Error connecting database" + err);
    throw err;
  }
});

export const execQuery = util.promisify(dbcon.query).bind(dbcon);

export default dbcon;
