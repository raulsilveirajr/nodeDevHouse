/* eslint-disable import/extensions */
import { Router } from "express";
import multer from "multer";
import HouseController from "../controllers/HouseController.js";

import uploadConfig from "../config/upload.js";

const upload = multer(uploadConfig);

const houseRoutes = new Router();

houseRoutes.get("/houses", HouseController.index);
houseRoutes.get("/houses/:id", HouseController.get);
houseRoutes.post("/houses", upload.single("thumbnail"), HouseController.store);
houseRoutes.put(
  "/houses/:id",
  upload.single("thumbnail"),
  HouseController.update,
);
houseRoutes.delete("/houses", HouseController.delete);

export default houseRoutes;
