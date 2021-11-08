"use strict";

import { playlistJsonStore } from "../models/json/playlist-json-store.js";

export const songController = {
  async index(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const playlist = await playlistJsonStore.getPlaylist(playlistId);
    const song = await playlistJsonStore.getSong(playlistId, songId);
    const viewData = {
      title: "Edit Song",
      playlist: playlist,
      song: song
    };
    return response.view("song-view", viewData);
  },

  async update(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const song = await playlistJsonStore.getSong(playlistId, songId);
    const newSong = {
      title: request.payload.title,
      artist: request.payload.artist,
      duration: Number(request.payload.duration)
    };
    await playlistJsonStore.updateSong(song, newSong);
    return response.redirect("/playlist/" + playlistId);
  }
};
