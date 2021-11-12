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

  async deleteTrack(request, response) {
    const playlist = await db.playlistStore.getPlaylistById(request.params.id);
    await playlistJsonStore.removeTrack(playlist, request.params.songid);
    return response.redirect("/playlist/" + playlist._id);
  },

  async addTrack(request, response) {
    const playlist = await db.playlistStore.getPlaylistById(request.params.id);
    const newTrack = {
      title: request.payload.title,
      artist: request.payload.artist,
      duration: Number(request.payload.duration)
    };
    await db.playlistStore.addTrack(playlist, newTrack);
    return response.redirect("/playlist/" + playlist._id);
  }
};

