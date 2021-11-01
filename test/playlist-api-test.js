"use strict";

import { assert } from "chai";
import * as fixtures from "./fixtures.json";
import { PlaylistService } from "./playlist-service.js";
import { v4 } from "uuid";

suite("User API tests", function() {

  let newUser = fixtures.default.newUser;

  const playlistService = new PlaylistService(fixtures.default.playlistService);

  suiteSetup(async function() {
    await playlistService.deleteAllUsers();
    await playlistService.createUser(newUser);
  });

  suiteTeardown(async function() {
    await playlistService.deleteAllUsers();

  });

  test("create playlist", async function() {
    const credentials = {
      email: newUser.email,
      password: newUser.password
    };

    const result = await playlistService.authenticate(credentials);
    assert.isNotNull(result.id, "no ID");
    const newPlaylist = {
      id: v4(),
      userid: result.id,
      title: "New Playlist",
      songs: []
    };
    await playlistService.createPlaylist(newPlaylist);
  });
});
