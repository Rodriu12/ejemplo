"use strict";
import User from "../entity/autos.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getAutoService(query) {
  try {
    const { patente, marca, año } = query;

    const AutoRepository = AppDataSource.getRepository(Auto);

    const autoFound = await autoRepository.findOne({
      where: [{ patente: patente }, { marca: marca }, { año: año }],
    });

    if (!autoFound) return [null, "Auto no encontrado"];

    const { patente, ...autoData } = autoFound;

    return [autoData, null];
  } catch (error) {
    console.error("Error obtener el auto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getAutosService() {
  try {
    const autoRepository = AppDataSource.getRepository(Auto);

    const autos = await autoRepository.find();

    if (!autos || autos.length === 0) return [null, "No hay autos"];

    const autosData = autos.map(({ patente, ...auto }) => auto);

    return [autosData, null];
  } catch (error) {
    console.error("Error al obtener los autos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateAutoService(query, body) {
  try {
    const { patente, marca, año } = query;

    const autoRepository = AppDataSource.getRepository(Auto);

    const autoFound = await autoRepository.findOne({
      where: [{ patente: patente }, { marca: marca }, { año: año }],
    });

    if (!autoFound) return [null, "Auto no encontrado"];

    const existingAuto = await autoRepository.findOne({
      where: [{ patente: body.patente }],
    });

    if (existingAuto && existingAuto.patente !== autoFound.patente) {
      return [null, "Ya existe un auto con la misma patente"];
    }

    if (body.patente) {
      const matchPatente = await comparePatente(
        body.patente,
        userFound.patente,
      );

      if (!matchPatente) return [null, "La patente no coincide"];
    }

    const dataAutoUpdate = {
      marca: body.marca,
      año: body.año,
      updatedAt: new Date(),
    };

    await autoRepository.update({ patente: autoFound.patente }, dataAutoUpdate);

    const userData = await userRepository.findOne({
      where: { patente: autoFound.patente },
    });

    if (!userData) {
      return [null, "Auto no encontrado después de actualizar"];
    }

    const { patente, ...autoUpdated } = autoData;

    return [autoUpdated, null];
  } catch (error) {
    console.error("Error al modificar un auto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteAutoService(query) {
  try {
    const { patente, marca, año } = query;

    const autoRepository = AppDataSource.getRepository(Auto);

    const autoFound = await autoRepository.findOne({
      where: [{ patente: patente }, { marca: marca }, { año: año }],
    });

    if (!autoFound) return [null, "Auto no encontrado"];

    const autoDeleted = await autoRepository.remove(autoFound);

    const { patente, ...dataAuto } = autoDeleted;

    return [dataAuto, null];
  } catch (error) {
    console.error("Error al eliminar un auto:", error);
    return [null, "Error interno del servidor"];
  }
}