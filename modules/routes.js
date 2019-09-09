import express from "express";
import Auth from "./api/auth";
import Users from "./api/users";
import Utils from "./utils";

let Router = express.Router();

Router.use("/auth", Auth);
Router.use("/users", Utils.isAuthorized, Users);

export default Router;
