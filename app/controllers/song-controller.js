"use strict";

import { playlistStore } from "../models/playlist-store.js";

export const songController = {
  async index(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const playlist = await playlistStore.getPlaylist(playlistId);
    const song = await playlistStore.getSong(playlistId, songId);
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
    const song = await playlistStore.getSong(playlistId, songId);
    const newSong = {
      title: request.payload.title,
      artist: request.payload.artist,
      duration: Number(request.payload.duration)
    };
    await playlistStore.updateSong(song, newSong);
    return response.redirect("/playlist/" + playlistId);
  }
};
