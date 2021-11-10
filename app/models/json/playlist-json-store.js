"use strict";

import lodash from "lodash";
import { JsonStore } from "./json-store.js";
import { v4 } from "uuid";

export const playlistJsonStore = {
  store: new JsonStore("./app/models/json/playlists.json", {
    playlistCollection: []
  }),
  collection: "playlistCollection",

  async getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

  async getPlaylistById(id) {
    return await this.store.findOneBy(this.collection, { _id: id });
  },

  async getUserPlaylists(user) {
    return await this.store.findBy(this.collection, { userid: user.id });
  },

  async addPlaylist(playlist) {
    playlist._id = v4();
    return await this.store.add(this.collection, playlist);
  },

  async removePlaylist(playlist) {
    await this.store.remove(this.collection, playlist);
  },

  async deleteAllPlaylists() {
    await this.store.removeAll(this.collection);
  },

  async addSong(playlist, song) {
    if (!playlist.songs) {
      playlist.songs = [];
    }
    song.id = v4();
    playlist.songs.push(song);

    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) {
      duration += playlist.songs[i].duration;
    }

    playlist.duration = duration;
    await this.store.save();
  },

  async removeSong(playlist, songId) {
    const songs = playlist.songs;
    lodash.remove(songs, { id: songId });
    await this.store.save();
  },

  async getSong(id, songId) {
    const playList = await this.store.findOneBy(this.collection, { id: id });
    const songs = playList.songs.filter(song => song.id == songId);
    return songs[0];
  },

  async updateSong(song, updatedSong) {
    song.title = updatedSong.title;
    song.artist = updatedSong.artist;
    song.duration = updatedSong.duration;
    await this.store.save();
  }
};
