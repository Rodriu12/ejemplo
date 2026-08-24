"use strict";
import {
  autoBodyValidation,
  autoQueryValidation,
} from "../validations/auto.validation.js";
import { handleErrorClient } from "../handlers/responseHandlers.js";

export function validateAutoQuery(req, res, next) {
  const query = {
    ...req.query,
    patente: req.params.patente || req.query.patente,
  };
  const { error, value } = autoQueryValidation.validate(query);

  if (error) return handleErrorClient(res, 400, error.message);

  req.autoQuery = value;
  next();
}

export function validateAutoBody(req, res, next) {
  const { error, value } = autoBodyValidation.validate(req.body);

  if (error) {
    return handleErrorClient(
      res,
      400,
      "Error de validación en los datos enviados",
      error.message,
    );
  }

  req.body = value;
  next();
}