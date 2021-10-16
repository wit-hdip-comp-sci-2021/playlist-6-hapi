"use strict";

import { accountsController } from "./accounts-controller.js";
import { playlistStore } from "../models/playlist-store.js";
import { v4 as uuidv4 } from "uuid";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = request.auth.credentials
    const playlists = await playlistStore.getUserPlaylists(loggedInUser.id)
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlists
    };
    return response.view("dashboard-view.hbs", viewData);
  },

  async deletePlaylist(request, response) {
    const playlistId = request.params.id;
    await playlistStore.removePlaylist(playlistId);
    return response.redirect("/dashboard");
  },

  async addPlaylist(request, response) {
    const loggedInUser = request.auth.credentials
    const newPlayList = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: []
    };
    playlistStore.addPlaylist(newPlayList);
    return response.redirect("/dashboard");
  }
};
