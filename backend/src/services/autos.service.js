"use strict";
import Auto from "../entity/autos.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getAutoService(query) {
  try {
    const { patente, marca, año } = query;

    const autoRepository = AppDataSource.getRepository(Auto);

    const autoFound = await autoRepository.findOne({
      where: [{ patente: patente }, { marca: marca }, { año: año }],
    });

    if (!autoFound) return [null, "Auto no encontrado"];

    const autoData = { ...autoFound };
    delete autoData.patente;

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

    const dataAutoUpdate = {
      ...(body.marca !== undefined && { marca: body.marca }),
      ...(body.año !== undefined && { año: body.año }),
      updatedAt: new Date(),
    };

    await autoRepository.update({ patente: autoFound.patente }, dataAutoUpdate);

    const autoUpdatedData = await autoRepository.findOneBy({
      patente: autoFound.patente,
    });

    if (!autoUpdatedData) return [null, "Auto no encontrado después de actualizar"];

    const autoUpdated = { ...autoUpdatedData };
    delete autoUpdated.patente;

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

    const dataAuto = { ...autoDeleted };
    delete dataAuto.patente;

    return [dataAuto, null];
  } catch (error) {
    console.error("Error al eliminar un auto:", error);
    return [null, "Error interno del servidor"];
  }
}