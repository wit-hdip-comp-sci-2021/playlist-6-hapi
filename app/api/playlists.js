"use strict";

import Boom from "@hapi/boom";
import { playlistJsonStore } from "../models/json/playlist-json-store.js";
import { Playlist, PlaylistArray, Uuid } from "../models/joi-schemas.js";
import Joi from "joi";

// https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

export const Playlists = {
  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const playlists = await playlistJsonStore.getAllPlaylists();
        return playlists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlaylistArray },
    description: "Get all playlists",
    notes: "Returns all playlists"
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const playlist = await playlistJsonStore.getPlaylist(request.params.id);
        if (!playlist) {
          return Boom.notFound("No Playlist with this id");
        }
        return playlist;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Find a Playlist",
    notes: "Returns a playlist",
    validate: {
      params: Joi.object({
        id: Uuid
      })
    },
    response: { schema: Playlist }
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const playlist = request.payload;
        await playlistJsonStore.addPlaylist(playlist);
        if (playlist) {
          return h.response(playlist).code(201);
        }
        return Boom.badImplementation("error creating playlist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Playlist",
    notes: "Returns the newly created playlist",
    validate: {
      payload: Playlist
    },
    response: { schema: Playlist }
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const playlist = await playlistJsonStore.getPlaylist(request.params.id);
        await playlistJsonStore.removePlaylist(playlist);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users"
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      try {
        await playlistJsonStore.deleteAllPlaylists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all Playlists"
  },
};
