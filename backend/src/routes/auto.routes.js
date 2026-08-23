"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  validateAutoBody,
  validateAutoQuery,
} from "../middlewares/auto.middleware.js";
import {
  deleteAuto,
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
  .get("/auto/:patente", validateAutoQuery, getAuto)
  .patch("/auto/marca/:patente", validateAutoQuery, validateAutoBody, updateAuto)
  .delete("/auto/:patente", validateAutoQuery, deleteAuto);

export default router;