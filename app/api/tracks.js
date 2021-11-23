import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { Id, Track, TrackArray } from "./schemas.js";
import { validationError } from "../utils/logger.js";

export const Tracks = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const tracks = await db.trackStore.getAllTracks();
        return tracks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: TrackArray, failAction: validationError },
    description: "Get all tracks",
    notes: "Returns all tracks",
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const track = await db.trackStore.addTrack(request.params.id, request.payload);
        if (track) {
          return h.response(track).code(201);
        }
        return Boom.badImplementation("error creating track");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a track",
    notes: "Returns the newly created track",
    validate: { payload: Track },
    response: { schema: Track, failAction: validationError },
  },
  //
  // findOne: {
  //   auth: false,
  //   handler: async function (request, h) {
  //     try {
  //       const user = await db.userStore.getUserById(request.params.id);
  //       if (!user) {
  //         return Boom.notFound("No User with this id");
  //       }
  //       return user;
  //     } catch (err) {
  //       return Boom.serverUnavailable("No User with this id");
  //     }
  //   },
  //   tags: ["api"],
  //   description: "Get a specific user",
  //   notes: "Returns user details",
  //   validate: { params: Id, failAction: validationError },
  //   response: { schema: User, failAction: validationError },
  // },
  //

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.trackStore.deleteAllTracks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all tracks",
  },
  //
  // deleteOne: {
  //   auth: false,
  //   handler: async function (request, h) {
  //     try {
  //       await db.userStore.deleteUserById(request.params.id);
  //       return h.response().code(204);
  //     } catch (err) {
  //       return Boom.serverUnavailable("Database Error");
  //     }
  //   },
  //   tags: ["api"],
  //   description: "Delete all users",
  //   validate: { params: Id, failAction: validationError },
  // },
};
