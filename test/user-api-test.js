"use strict";

import { assert } from "chai";
import * as fixtures from "./fixtures.json";
import {PlaylistService} from "./playlist-service.js";
import lowdash from "lodash";

suite("User API tests", function() {
  let users = fixtures.default.users;
  let newUser = fixtures.default.newUser;

  const playlistService = new PlaylistService(fixtures.default.donationService);

  suiteSetup(async function() {
    await playlistService.deleteAllUsers();
  });

  suiteTeardown(async function() {
  });

  test("create a user", async function() {
    const test = {
      firstName: "Maggie",
      lastName: "Simpson",
      email: "maggie@simpson.com",
      password: "secret"
    };
    const returnedUser = await playlistService.createUser(newUser);
    console.log(test);
    console.log(returnedUser);
    assert(lowdash.some([returnedUser], test), "returnedUser must be a superset of newUser");
    assert.isDefined(returnedUser._id);
  });

  test("get user", async function() {
    const u1 = await playlistService.createUser(newUser);
    const u2 = await playlistService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test("get invalid user", async function() {
    const u1 = await playlistService.getUser("1234");
    assert.isNull(u1);
    const u2 = await playlistService.getUser("012345678901234567890123");
    assert.isNull(u2);
  });
});
