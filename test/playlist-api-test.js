"use strict";

import { assert } from "chai";
import * as fixtures from "./fixtures.json";
import { PlaylistService } from "./playlist-service.js";
import lowdash from "lodash";

suite("User API tests", function() {

  let newUser = fixtures.default.newUser;
  const playlistService = new PlaylistService(fixtures.default.playlistService);

  const credentials = {
    email: newUser.email,
    password: newUser.password
  };
  const newPlaylist = {
    title: "New Playlist"
  };

  suiteSetup(async function() {
    await playlistService.deletePlaylists();
    await playlistService.deleteAllUsers();
    await playlistService.createUser(newUser);
  });

  setup(async function() {
    await playlistService.deletePlaylists();
  });

  teardown(async function() {
    await playlistService.deletePlaylists();
  });

  test("create playlist", async function() {
    const user = await playlistService.authenticate(credentials);
    assert.isNotNull(user._id, "no ID");
    newPlaylist.userid = user._id;
    const playlist = await playlistService.createPlaylist(newPlaylist);
    assert.isNotNull(playlist);
    assert(lowdash.some([playlist], newPlaylist), "returned playlist must be a superset of new playlist");
  });

  test("delete a playlist", async function() {
    const user = await playlistService.authenticate(credentials);
    newPlaylist.userid = user._id;
    const playlist = await playlistService.createPlaylist(newPlaylist);
    assert.isNotNull(playlist);
    const response = await playlistService.deletePlaylist(playlist._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaylist = await playlistService.getPlaylist(playlist.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });

  test("create multiple playlists", async function() {
    const user = await playlistService.authenticate(credentials);
    for (let playlist of fixtures.default.playlists) {
      playlist.userid = user._id;
      await playlistService.createPlaylist(playlist);
    }
    let playlists = await playlistService.getPlaylists();
    assert.equal(fixtures.default.playlists.length, playlists.length);
    await playlistService.deletePlaylists();
    playlists = await playlistService.getPlaylists();
    assert.equal(playlists.length, 0);
  });

  test("remove non-existant playlist", async function() {
    const user = await playlistService.authenticate(credentials);
    try {
      const response = await playlistService.deletePlaylist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });
});
