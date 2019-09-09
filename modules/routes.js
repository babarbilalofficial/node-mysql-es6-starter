import express from "express";
import Auth from "./api/auth";
import Users from "./api/users";
import Companies from "./api/companies";
import Utils from "./utils";

let Router = express.Router();

Router.use("/auth", Auth);
Router.use("/users", Utils.isAuthorized, Users);
Router.use("/companies", Utils.isAuthorized, Companies);

export default Router;
