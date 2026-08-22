"use strict";
import Joi from "joi";

export const autoQueryValidation = Joi.object({
    patente: Joi.string()
    .min(5)
    .max(7)
    .pattern(/^(?:[B-DF-HJ-NP-TV-Z]{4}[-\s]?\d{2}|[A-Z]{2}[-\s]?\d{4})$/i)
    .messages({
        "string.empty":"La patente no debe estar vacía.",
        "string.base":"La patente debe ser un string.",
        "string.min": "La patente tener mínimo 5 caracteres.",
        "string.max": "La patente tener máximo 7 caracteres.",
        "string.pattern.base": "Formato de la patente inválido.",
    }),
    marca: Joi.string()
    .min(10)
    .max(20)
    .messages({
        "string.empty":"La patente no debe estar vacía.",
        "string.base":"La marca debe ser un string.",
        "string.min":
        "La marca debe tener mínimo 10 caracteres.",
        "string.max":
        "El correo electrónico debe tener como máximo 35 caracteres.",
    }),
    año: Joi.number()
    .integer()
    .positive()
    .messages({
    "string.empty": "El año no debe estar vacío.",
    "string.base": "El año debe ser un número.",
    "string.integer":"El año debe ser un entero.",
    "string.positive":"El año no debe ser negativo.",
    }),
})
    .or("patente", "marca", "año")
    .unknown(false)
    .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro: patente, marca o año.",
});

export const autoBodyValidation = Joi.object({
    patente: Joi.string()
    .min(5)
    .max(7)
    .pattern(/^(?:[B-DF-HJ-NP-TV-Z]{4}[-\s]?\d{2}|[A-Z]{2}[-\s]?\d{4})$/i),
    marca: Joi.string().min(10).max(20),
    año: Joi.number().integer().positive(),
})
    .min(1)
    .unknown(false)
    .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.min": "Debes proporcionar al menos un campo para actualizar.",
});
