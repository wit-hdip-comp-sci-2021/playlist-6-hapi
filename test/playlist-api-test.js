import { assert } from "chai";
import lowdash from "lodash";
import * as fixtures from "./fixtures.json";
import { PlaylistService } from "./playlist-service.js";

suite("User API tests", () => {
  const { newUser } = fixtures.default;
  const playlistService = new PlaylistService(fixtures.default.playlistService);

  const credentials = {
    email: newUser.email,
    password: newUser.password,
  };
  const newPlaylist = {
    title: "New Playlist",
  };

  suiteSetup(async () => {
    await playlistService.deletePlaylists();
    await playlistService.deleteAllUsers();
    await playlistService.createUser(newUser);
  });

  setup(async () => {
    await playlistService.deletePlaylists();
  });

  teardown(async () => {
    await playlistService.deletePlaylists();
  });

  test("create playlist", async () => {
    const user = await playlistService.authenticate(credentials);
    assert.isNotNull(user._id, "no ID");
    newPlaylist.userid = user._id;
    const playlist = await playlistService.createPlaylist(newPlaylist);
    assert.isNotNull(playlist);
    assert(lowdash.some([playlist], newPlaylist), "returned playlist must be a superset of new playlist");
  });

  test("delete a playlist", async () => {
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

  test("create multiple playlists", async () => {
    const user = await playlistService.authenticate(credentials);
    // eslint-disable-next-line no-restricted-syntax
    for (const playlist of fixtures.default.playlists) {
      playlist.userid = user._id;
      await playlistService.createPlaylist(playlist);
    }
    let playlists = await playlistService.getPlaylists();
    assert.equal(fixtures.default.playlists.length, playlists.length);
    await playlistService.deletePlaylists();
    playlists = await playlistService.getPlaylists();
    assert.equal(playlists.length, 0);
  });

  test("remove non-existant playlist", async () => {
    const user = await playlistService.authenticate(credentials);
    try {
      const response = await playlistService.deletePlaylist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });
});
