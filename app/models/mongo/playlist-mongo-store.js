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

  // async addSong(playlist, song) {
  //   if (!playlist.songs) {
  //     playlist.songs = [];
  //   }
  //   song._id = v4();
  //   playlist.songs.push(song);
  //
  //   let duration = 0;
  //   for (let i = 0; i < playlist.songs.length; i++) {
  //     duration += playlist.songs[i].duration;
  //   }
  //
  //   playlist.duration = duration;
  // },
  //
  // async removeSong(playlist, songId) {
  //   const songs = playlist.songs;
  //   lodash.remove(songs, { _id: songId });
  // },
  //
  // async getSong(id, songId) {
  //   const playList = this.getPlaylistById(id);
  //   const songs = playList.songs.filter(song => song._id == songId);
  //   return songs[0];
  // },
  //
  // async updateSong(song, updatedSong) {
  //   song.title = updatedSong.title;
  //   song.artist = updatedSong.artist;
  //   song.duration = updatedSong.duration;
  // }
};
