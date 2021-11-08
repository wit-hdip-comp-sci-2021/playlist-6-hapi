"use strict";

import { playlistJsonStore } from "../models/json/playlist-json-store.js";
import { accountsController } from "./accounts-controller.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = request.auth.credentials;
    const playlists = await playlistJsonStore.getUserPlaylists(loggedInUser);
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlists
    };
    return response.view("dashboard-view.hbs", viewData);
  },

  async deletePlaylist(request, response) {
    const playlist = await playlistJsonStore.getPlaylist(request.params.id);
    await playlistJsonStore.removePlaylist(playlist);
    return response.redirect("/dashboard");
  },

  async addPlaylist(request, response) {
    const loggedInUser = request.auth.credentials;
    const newPlayList = {
      userid: loggedInUser.id,
      title: request.payload.title,
      songs: []
    };
    playlistJsonStore.addPlaylist(newPlayList);
    return response.redirect("/dashboard");
  }
};
