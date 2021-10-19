"use strict";

import lodash from "lodash";
import { JsonStore } from "./json-store.js";

export const playlistStore = {
  store: new JsonStore("./app/models/playlist-store.json", {
    playlistCollection: []
  }),
  collection: "playlistCollection",

  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

  async getPlaylist(id) {
    return await this.store.findOneBy(this.collection, { id: id });
  },

  async getUserPlaylists(userid) {
    return await this.store.findBy(this.collection, { userid: userid });
  },

  addPlaylist(playlist) {
    this.store.add(this.collection, playlist);
  },

  async removePlaylist(id) {
    const playlist = await this.getPlaylist(id);
    await this.store.remove(this.collection, playlist);
  },

  removeAllPlaylists() {
    this.store.removeAll(this.collection);
  },

  async addSong(id, song) {
    const playlist = await this.getPlaylist(id);
    playlist.songs.push(song);

    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) {
      duration += playlist.songs[i].duration;
    }

    playlist.duration = duration;
    await this.store.save();
  },

  async removeSong(id, songId) {
    const playlist = await this.getPlaylist(id);
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
