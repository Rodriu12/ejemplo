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
});

export default UserSchema;