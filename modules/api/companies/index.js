import express from "express";
import controller from "./companies.controller";
const router = express.Router();

router.get("/", controller.get);

export default router;
