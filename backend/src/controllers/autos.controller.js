"use strict";
import {
  deleteAutoService,
  getAutoService,
  getAutosService,
  updateAutoService,
} from "../services/autos.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getAuto(req, res) {
  try {
    const { patente, marca, año } = req.autoQuery;

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
    const { patente, marca, año } = req.autoQuery;
    const { body } = req;

    const [auto, autoError] = await updateAutoService({ patente, marca, año }, body);

    if (autoError) return handleErrorClient(res, 400, "Error modificando el auto", autoError);

    handleSuccess(res, 200, "Usuario modificado correctamente", auto);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteAutos(req, res) {
  try {
    const { patente, marca, año } = req.autoQuery;

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

export async function deleteAuto(req, res) {
  try {
    const [autoDelete, errorAutoDelete] = await deleteAutoService(req.autoQuery);

    if (errorAutoDelete) {
      return handleErrorClient(res, 404, "Error al eliminar el auto", errorAutoDelete);
    }

    handleSuccess(res, 200, "Auto eliminado correctamente", autoDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}