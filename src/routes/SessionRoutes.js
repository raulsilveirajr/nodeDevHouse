/* eslint-disable import/extensions */
import { Router } from "express";
import SessionController from "../controllers/SessionController.js";

const sessionRoutes = new Router();

sessionRoutes.post("/session", SessionController.store);

export default sessionRoutes;
