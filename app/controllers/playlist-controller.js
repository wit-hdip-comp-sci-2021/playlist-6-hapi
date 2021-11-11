"use strict";

import { playlistJsonStore } from "../models/json/playlist-json-store.js";
import { playlistAnalytics } from "../utils/playlist-analytics.js";
import { db } from "../models/db.js";

export const playlistController = {
  validationError: null,

  async index(request, response) {
    const playlist = await db.playlistStore.getPlaylistById(request.params.id);
    const viewData = {
      title: "Playlist",
      playlist: playlist,
      playlistSummary: {
        shortestSong: playlistAnalytics.getShortestSong(playlist),
        duration: playlistAnalytics.getPlaylistDuration(playlist)
      }
    };
    return response.view("playlist-view", viewData);
  },

  async deleteSong(request, response) {
    const playlist = await db.playlistStore.getPlaylistById(request.params.id);
    await playlistJsonStore.removeSong(playlist, request.params.songid);
    return response.redirect("/playlist/" + playlist._id);
  },

  async addSong(request, response) {
    const playlist = await playlistJsonStore.getPlaylistById(request.params.id);
    const newSong = {
      title: request.payload.title,
      artist: request.payload.artist,
      duration: Number(request.payload.duration)
    };
    await playlistJsonStore.addSong(playlist, newSong);
    return response.redirect("/playlist/" + playlist._id);
  }
};

