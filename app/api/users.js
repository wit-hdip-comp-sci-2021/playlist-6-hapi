"use strict";

import { userStore } from "../models/user-store.js";
import Boom from "@hapi/boom";
import Joi from "Joi";

const userModel = Joi.object({
  firstName: Joi.string(),
  lastName:Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  id: Joi.string().uuid()
}).label("User");

export const Users = {
  find: {
    auth: false,
    handler: async function(request, h) {
      const users = await userStore.getAllUsers();
      return users;
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns all users"
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.notFound("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    response: { schema: userModel },
    validate: {
      params: Joi.object({
        id: Joi.string()
          .required()
          .description("the id of the user")
      })
    }
  }
};
