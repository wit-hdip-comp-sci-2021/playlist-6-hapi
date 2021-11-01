"use strict";

import { userStore } from "../models/user-store.js";
import Boom from "@hapi/boom";
import Joi from "Joi";
import { v4 } from "uuid";
import { User, UserArray, UserCredentials, UserDetails, Uuid } from "../models/joi-schemas.js";

export const Users = {
  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const users = await userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
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
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    response: { schema: User },
    validate: {
      params: Joi.object({
        id: Uuid
      })
    }
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = request.payload;
        user.id = v4();
        await userStore.addUser(user);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
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
      try {
        await userStore.deleteAll();
        return { success: true };
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users"
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        await userStore.deleteUserById(request.params.id);
        return { success: true };
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users"
  },

  authenticate: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await userStore.getUserByEmail(request.payload.email);
        if (user) {
          return h.response(user).code(200);
        } else {
          return Boom.unauthorized();
        }
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate a user",
    validate: {
      payload: UserCredentials
    },
    response: { schema: User }
  }
};
