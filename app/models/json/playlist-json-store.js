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

  async addTrack(playlist, track) {
    if (!playlist.tracks) {
      playlist.tracks = [];
    }
    track._id = v4();
    playlist.tracks.push(track);
    await db.write();
  },

  async removeTrack(playlist, trackId) {
    const tracks = playlist.tracks;
    const index = tracks.findIndex (track => track._id == trackId)
    tracks.splice(index, 1);
    await db.write();
  },

  async getTrack(id, trackId) {
    const playList = await this.getPlaylistById(id);
    return playList.tracks.find(track => track._id == trackId);
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
    await db.write();
  }
};
