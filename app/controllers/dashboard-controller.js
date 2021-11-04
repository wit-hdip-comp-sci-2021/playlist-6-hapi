"use strict";

import { playlistStore } from "../models/playlist-store.js";
import { accountsController } from "./accounts-controller.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = request.auth.credentials;
    const playlists = await playlistStore.getUserPlaylists(loggedInUser);
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlists
    };
    return response.view("dashboard-view.hbs", viewData);
  },

  async deletePlaylist(request, response) {
    const playlist = await playlistStore.getPlaylist(request.params.id);
    await playlistStore.removePlaylist(playlist);
    return response.redirect("/dashboard");
  },

  async addPlaylist(request, response) {
    const loggedInUser = request.auth.credentials;
    const newPlayList = {
      userid: loggedInUser.id,
      title: request.payload.title,
      songs: []
    };
    playlistStore.addPlaylist(newPlayList);
    return response.redirect("/dashboard");
  }
};
