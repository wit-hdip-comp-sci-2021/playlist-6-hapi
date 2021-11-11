"use strict";

import lodash from "lodash";
import { v4 } from "uuid";

export const playlistMemStore = {
  store: [],

  getAllPlaylists() {
    return this.store;
  },

  async getPlaylistById(id) {
    return lodash.find(this.store, { _id: id });
  },

  async getUserPlaylists(userid) {
    return lodash.filter(this.store, { userid: userid });
  },

  addPlaylist(playlist) {
    playlist._id = v4();
    this.store.push(playlist);
    return playlist;
  },

  async removePlaylist(id) {
    const playlist = await this.getPlaylistById(id);
    lodash.remove(this.store, playlist);
  },

  async deleteAllPlaylists() {
    this.store = [];
  },

  async addSong(playlist, song) {
    if (!playlist.songs) {
      playlist.songs = [];
    }
    song._id = v4();
    playlist.songs.push(song);

    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) {
      duration += playlist.songs[i].duration;
    }

    playlist.duration = duration;
  },

  async removeSong(playlist, songId) {
    const songs = playlist.songs;
    lodash.remove(songs, { _id: songId });
  },

  async getSong(id, songId) {
    const playList = this.getPlaylistById(id);
    const songs = playList.songs.filter(song => song._id == songId);
    return songs[0];
  },

  async updateSong(song, updatedSong) {
    song.title = updatedSong.title;
    song.artist = updatedSong.artist;
    song.duration = updatedSong.duration;
  }
};
