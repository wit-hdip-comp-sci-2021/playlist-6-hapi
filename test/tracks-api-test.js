import { assert } from "chai";
import lowdash from "lodash";
import { isSubset } from "./test-utils.js";
import * as fixtures from "./fixtures.json";
import { PlaylistService } from "./playlist-service.js";

suite("Track API tests", () => {
  const { newUser, tracks } = fixtures.default;
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
    await playlistService.deleteAllTracks();
    await playlistService.createUser(newUser);
  });

  setup(async () => {
    await playlistService.deletePlaylists();
  });

  teardown(async () => {
    await playlistService.deletePlaylists();
  });

  test("create track", async () => {
    const user = await playlistService.authenticate(credentials);
    assert.isNotNull(user._id, "no ID");
    newPlaylist.userid = user._id;
    const playlist = await playlistService.createPlaylist(newPlaylist);
    assert.isNotNull(playlist);
    const allTracks = await playlistService.getTracks();
    assert.equal(allTracks.length, 0);

    const track = await playlistService.createTrack(playlist._id, tracks[0]);
    assert(isSubset(tracks[0], track), "returned track must be a superset of new track");
  });

  test("create Multiple track", async () => {
    const user = await playlistService.authenticate(credentials);
    newPlaylist.userid = user._id;
    const playlist = await playlistService.createPlaylist(newPlaylist);
    assert.isNotNull(playlist);
    const allTracks = await playlistService.getTracks();
    assert.equal(allTracks.length, 0);

    const track = await playlistService.createTrack(playlist._id, tracks[0]);
    assert(isSubset(tracks[0], track), "returned track must be a superset of new track");
  });
});
