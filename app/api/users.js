"use strict";

import { userStore } from "../models/user-store.js";
import Boom from "@hapi/boom";
import Joi from "Joi";
import { v4 as uuidv4 } from "uuid";
import { User, UserId, UserDetails, UserArray} from "../models/joi-schemas.js";

export const Users = {
  find: {
    auth: false,
    handler: async function(request, h) {
      const users = await userStore.getAllUsers();
      return users;
    },
    tags: ["api"],
    response: { schema: UserArray },
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
    response: { schema: User },
    validate: {
      params: Joi.object({
        id: UserId
      })
    }
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      const user = request.payload;
      user.id = uuidv4();
      await userStore.addUser(user);
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error creating user");
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: {
      payload: UserDetails
    },
    response: { schema: User }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await userStore.deleteAll();
      return { success: true };
    },
    tags: ["api"],
    description: "Delete all users"
  }
};
