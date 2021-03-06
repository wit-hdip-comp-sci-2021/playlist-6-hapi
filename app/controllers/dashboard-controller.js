import { db } from "../models/db.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = request.auth.credentials;
    const playlists = await db.playlistStore.getUserPlaylists(loggedInUser._id);
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlists,
    };
    return response.view("dashboard-view.hbs", viewData);
  },

  async deletePlaylist(request, response) {
    const playlist = await db.playlistStore.getPlaylistById(request.params.id);
    await db.playlistStore.deletePlaylistById(playlist._id);
    return response.redirect("/dashboard");
  },

  async addPlaylist(request, response) {
    const loggedInUser = request.auth.credentials;
    const newPlayList = {
      userid: loggedInUser._id,
      title: request.payload.title,
    };
    await db.playlistStore.addPlaylist(newPlayList);
    return response.redirect("/dashboard");
  },
};
