"use strict";
import {
  deleteAutoService,
  getAutoService,
  getAutosService,
  updateAutoService,
} from "../services/auto.service.js";
import {
  autoQueryValidation,
} from "../validations/auto.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getAuto(req, res) {
  try {
    const { patente, marca, año } = req.query;

    const { error } = autoQueryValidation.validate({ patente, marca, año });

    if (error) return handleErrorClient(res, 400, error.message);

    const [auto, errorAuto] = await getAutoService({ patente, marca, año });

    if (errorAuto) return handleErrorClient(res, 404, errorAuto);

    handleSuccess(res, 200, "Auto encontrado", auto);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAutos(req, res) {
  try {
    const [autos, errorAutos] = await getAutosService();

    if (errorAutos) return handleErrorClient(res, 404, errorAutos);

    autos.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Autos encontrados", autos);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateAuto(req, res) {
  try {
    const { patente, marca, año } = req.query;
    const { body } = req;

    const { error: queryError } = autoQueryValidation.validate({
      patente,
      marca,
      año,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = autoBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [auto, autoError] = await updateAutoService({ patente, marca, año }, body);

    if (autoError) return handleErrorClient(res, 400, "Error modificando el auto", autoError);

    handleSuccess(res, 200, "Usuario modificado correctamente", auto);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteAutos(req, res) {
  try {
    const { patente, marca, año } = req.query;

    const { error: queryError } = autoQueryValidation.validate({
      patente,
      marca,
      año,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [autoDelete, errorAutoDelete] = await deleteAutoService({
      patente,
      marca,
      año,
    });

    if (errorAutoDelete) return handleErrorClient(res, 404, "Error eliminado el auto", errorAutoDelete);

    handleSuccess(res, 200, "Auto eliminado correctamente", autoDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}