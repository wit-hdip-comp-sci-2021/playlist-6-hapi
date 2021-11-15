"use strict";

import { Playlist } from "./playlist.js";

export const playlistMongoStore = {

  async getAllPlaylists() {
    const playlists = await Playlist.find().lean();
    return playlists;
  },

  async getPlaylistById(id) {
    const playlist = await Playlist.findOne({ _id: id }).lean();
    return playlist;
  },

  async addPlaylist(playlist) {
    const newPlaylist = new Playlist(playlist);
    const playlistObj = await newPlaylist.save();
    return await this.getPlaylistById(playlistObj._id);
  },

  async getUserPlaylists(id) {
    const playlist = await Playlist.find({ userid: id }).lean();
    return playlist;
  },

  async deletePlaylistById(id) {
    await Playlist.deleteOne({ _id: id });
  },

  async deleteAllPlaylists() {
    await Playlist.deleteMany({});
  },
};
