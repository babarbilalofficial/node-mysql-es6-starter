import path from "path";

let config = {};

config.logFileDir = path.join(__dirname, "../log");
config.logFileName = "app.log";
config.dbHost = process.env.dbHost || "localhost";
config.dbUser = process.env.dbUser || "root";
config.dbPass = process.env.dbPass || "";
config.dbName = process.env.dbName || "testdb";
config.serverPort = process.env.serverPort || 3001;
config.apiHost = process.env.apiHost || "localhost:3001";
config.apiBaseURL = process.env.apiBaseURL || "/api";

export default config;
