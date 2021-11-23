import Boom from "@hapi/boom";
import { Id, Playlist, PlaylistArray } from "./schemas.js";
import { db } from "../models/db.js";
import { validationError } from "../utils/logger.js";

// https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

export const Playlists = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlists = await db.playlistStore.getAllPlaylists();
        return playlists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlaylistArray, failAction: validationError },
    description: "Get all playlists",
    notes: "Returns all playlists",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const playlist = await db.playlistStore.getPlaylist(request.params.id);
        if (!playlist) {
          return Boom.notFound("No Playlist with this id");
        }
        return playlist;
      } catch (err) {
        return Boom.serverUnavailable("No Playlist with this id");
      }
    },
    tags: ["api"],
    description: "Find a Playlist",
    notes: "Returns a playlist",
    validate: { params: Id, failAction: validationError },
    response: { schema: Playlist, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = request.payload;
        const newPlaylist = await db.playlistStore.addPlaylist(playlist);
        if (newPlaylist) {
          return h.response(newPlaylist).code(201);
        }
        return Boom.badImplementation("error creating playlist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Playlist",
    notes: "Returns the newly created playlist",
    validate: { payload: Playlist, failAction: validationError },
    response: { schema: Playlist, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        if (!playlist) {
          return Boom.notFound("No Playlist with this id");
        }
        await db.playlistStore.deletePlaylistById(playlist._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Playlist with this id");
      }
    },
    tags: ["api"],
    description: "Delete a playlist",
    validate: { params: Id, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.playlistStore.deleteAllPlaylists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all Playlists",
  },
};
