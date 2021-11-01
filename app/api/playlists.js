"use strict";

import Boom from "@hapi/boom";
import { v4 } from "uuid";
import { playlistStore } from "../models/playlist-store";
import { Playlist } from "../models/joi-schemas.js";
export const Playlists = {
  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const playlists = await playlistStore.getAllPlaylists();
        return playlists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: UserArray },
    description: "Get all playlists",
    notes: "Returns all playlists"
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const playlist = request.payload;
        playlist.id = v4();
        await playlist.addPlaylist(playlist);
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
  }
};
