"use strict";

import axios from "axios";

export class PlaylistService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    const res = await axios.get(this.baseUrl + "/api/users");
    return res.data;
  }

  async getUser(id) {
    const res = await axios.get(this.baseUrl + "/api/users/" + id);
    return res.data;
  }

  async authenticate(credentials) {
    const res = await axios.post(this.baseUrl + "/api/users/authenticate", credentials);
    return res.data;
  }

  async createUser(newUser) {
    const res = await axios.post(this.baseUrl + "/api/users", newUser);
    return res.data;
  }

  async deleteAllUsers() {
    const response = await axios.delete(this.baseUrl + "/api/users");
    return response.data;
  }

  async deleteUser(id) {
    const response = await axios.delete(this.baseUrl + "/api/users/" + id);
    return response.data;
  }

  async getPlaylists() {
    const res = await axios.get(this.baseUrl + "/api/playlists");
    return res.data;
  }

  async getPlaylist(id) {
    const res = await axios.get(this.baseUrl + "/api/playlists/" + id);
    return res.data;
  }

  async createPlaylist(playlist) {
    const res = await axios.post(this.baseUrl + "/api/playlists", playlist);
    return res.data;
  }

  async deletePlaylists() {
    const response = await axios.delete(this.baseUrl + "/api/playlists");
    return response.data;
  }

  async deletePlaylist(playlist) {
    const response = await axios.delete(this.baseUrl + "/api/playlists/" + playlist.id);
    return response;
  }
}
