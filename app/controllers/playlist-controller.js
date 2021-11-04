"use strict";

import { playlistStore } from "../models/playlist-store.js";
import { playlistAnalytics } from "../utils/playlist-analytics.js";

export const playlistController = {
  validationError: null,

  async index(request, response) {
    const playlistId = request.params.id;
    const playlist = await playlistStore.getPlaylist(playlistId);
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
    const playlist = await playlistStore.getPlaylist(request.params.id);
    await playlistStore.removeSong(playlist, request.params.songid);
    return response.redirect("/playlist/" + playlist.id);
  },

  async addSong(request, response) {
    const playlist = await playlistStore.getPlaylist(request.params.id);
    const newSong = {
      title: request.payload.title,
      artist: request.payload.artist,
      duration: Number(request.payload.duration)
    };
    await playlistStore.addSong(playlist, newSong);
    return response.redirect("/playlist/" + playlist.id);
  }
};

