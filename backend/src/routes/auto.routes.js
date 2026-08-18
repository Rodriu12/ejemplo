"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteAuto,
  deleteAutos,
  getAuto,
  getAutos,
  updateAuto,
} from "../controllers/autos.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/auto/", getAutos)
  .get("/auto/:patente", getAuto)
  .patch("/auto/marca/:patente", updateAuto)
  .delete("/auto/", deleteAutos)
  .delete("/auto/:patente", deleteAuto);

export default router;