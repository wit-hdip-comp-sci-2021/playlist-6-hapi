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

  async addTrack(playlist, track) {
    if (!playlist.tracks) {
      playlist.tracks = [];
    }
    track._id = v4();
    playlist.tracks.push(track);
  },

  async removetrack(playlist, trackId) {
    const tracks = playlist.tracks;
    const index = tracks.findIndex (track => track._id == trackId)
    tracks.splice(index, 1);
  },

  async getTrack(id, trackId) {
    const playList = await this.getPlaylistById(id);
    const tracks = playList.tracks.filter(track => track.id == trackId);
    return tracks[0];
  },

  async updateTrack(track, updatedtrack) {
    track.title = updatedtrack.title;
    track.artist = updatedtrack.artist;
    track.duration = updatedtrack.duration;
  }
};
