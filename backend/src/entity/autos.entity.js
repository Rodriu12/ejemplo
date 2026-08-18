"use strict";
import { EntitySchema } from "typeorm";

const UserSchema = new EntitySchema({
  name: "Autos",
  tableName: "autos",
  columns: {
    patente: {
      type: "varchar",
      length: 25,
      primary: true,
      unique: true,
    },
    marca: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    año: {
      type: "int",
      nullable: false,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  indices: [
    {
      name: "IDX_USER",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_USER_RUT",
      columns: ["rut"],
      unique: true,
    },
    {
      name: "IDX_USER_EMAIL",
      columns: ["email"],
      unique: true,
    },
  ],
});

export default UserSchema;