"use strict";

import { v4 } from "uuid";
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./app/models/json/playlists.json"));
db.data = { playlists: [] };

export const playlistJsonStore = {

  async getAllPlaylists() {
    await db.read();
    return db.data.playlists;
  },

  async addPlaylist(playlist) {
    await db.read();
    playlist._id = v4();
    db.data.playlists.push(playlist);
    await db.write();
    return playlist;
  },

  async getPlaylistById(id) {
    await db.read();
    return db.data.playlists.find (playlist => playlist._id == id)
  },

  async getUserPlaylists(userid) {
    await db.read();
    return db.data.playlists.filter (playlist => playlist.userid == userid)
  },

  async deletePlaylistById(id) {
    await db.read();
    const index = db.data.playlists.findIndex (playlist => playlist._id == id)
    db.data.playlists.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaylists() {
    db.data.playlists = [];
    await db.write();
  },

  async addSong(playlist, song) {
    if (!playlist.songs) {
      playlist.songs = [];
    }
    song._id = v4();
    playlist.songs.push(song);
    await db.write();
  },

  async removeSong(playlist, songId) {
    const songs = playlist.songs;
    const index = songs.findIndex (song => song._id == songId)
    songs.splice(index, 1);
    await db.write();
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
    await db.write();
  }
};
