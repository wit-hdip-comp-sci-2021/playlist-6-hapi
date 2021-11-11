"use strict";

import { v4 } from "uuid";
let playlists = [];

export const playlistMemStore = {

  async getAllPlaylists() {
    return playlists;
  },

  async addPlaylist(playlist) {
    playlist._id = v4();
    playlists.push(playlist);
    return playlist;
  },

  async getPlaylistById(id) {
    return playlists.find (playlist => playlist._id == id)
  },

  async getUserPlaylists(userid) {
    return playlists.filter (playlist => playlist.userid == userid)
  },

  async deletePlaylistById(id) {
    const index = playlists.findIndex (playlist => playlist._id == id)
    playlists.splice(index, 1);
  },

  async deleteAllPlaylists() {
    playlists = [];
  },

  async addSong(playlist, song) {
    if (!playlist.songs) {
      playlist.songs = [];
    }
    song._id = v4();
    playlist.songs.push(song);
  },

  async removeSong(playlist, songId) {
    const songs = playlist.songs;
    const index = songs.findIndex (song => song._id == songId)
    songs.splice(index, 1);
  },

  async getSong(id, songId) {
    const playList = await this.getPlaylistById(id);
    const songs = playList.songs.filter(song => song.id == songId);
    return songs[0];
  },

  async updateSong(song, updatedSong) {
    song.title = updatedSong.title;
    song.artist = updatedSong.artist;
    song.duration = updatedSong.duration;
  }
};
