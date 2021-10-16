"use strict";

import { playlistStore } from "../models/playlist-store.js";
import { playlistAnalytics } from "../utils/playlist-analytics.js";
import { v4 as uuidv4 } from "uuid";

export const playlistController = {
  validationError: null,

  async index(request, response) {
    const playlistId = request.params.id;
    const playlist = await playlistStore.getPlaylist(playlistId);
    let errorMsg = null;
    if (playlistController.validationError) {
      errorMsg = playlistController.validationError.message;
      playlistController.validationError = null;
    }
    const viewData = {
      title: "Playlist",
      playlist: playlist,
      playlistSummary: {
        shortestSong: playlistAnalytics.getShortestSong(playlist),
        duration: playlistAnalytics.getPlaylistDuration(playlist)
      },
      errors: errorMsg
    };
    return response.view("playlist-view", viewData);
  },

  async deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    await playlistStore.removeSong(playlistId, songId);
    return response.redirect("/playlist/" + playlistId);
  },

  async addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = await playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuidv4(),
      title: request.payload.title,
      artist: request.payload.artist,
      duration: Number(request.payload.duration)
    };
    await playlistStore.addSong(playlistId, newSong);
    return response.redirect("/playlist/" + playlistId);
  }
};

