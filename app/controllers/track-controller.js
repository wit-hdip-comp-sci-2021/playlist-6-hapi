"use strict";
import { db } from "../models/db.js";

export const trackController = {
  async index(request, response) {
    const playlist = await db.playlistStore.getPlaylistById(request.params.id);
    const track = await db.playlistStore.getTrack(request.params.id, request.params.trackid);
    const viewData = {
      title: "Edit Song",
      playlist: playlist,
      track: track
    };
    return response.view("track-view", viewData);
  },

  async update(request, response) {
    const track = await db.playlistStore.getTrack(request.params.id, request.params.trackid);
    const newTrack = {
      title: request.payload.title,
      artist: request.payload.artist,
      duration: Number(request.payload.duration)
    };
    await db.playlistStore.updateTrack(track, newTrack);
    return response.redirect("/playlist/" + request.params.id);
  }
};
