"use strict";

import { assert } from "chai";
import * as fixtures from "./fixtures.json";
import { PlaylistService } from "./playlist-service.js";
import lodash from "lodash";
import { v4 } from "uuid";

suite("User API tests", function() {
  let users = fixtures.default.users;
  let newUser = fixtures.default.newUser;

  const playlistService = new PlaylistService(fixtures.default.playlistService);

  suiteSetup(async function() {
    await playlistService.deleteAllUsers();
  });

  suiteTeardown(async function() {
    await playlistService.deleteAllUsers();
  });

  test("create a user", async function() {

    const testUser = {
      firstName: "Maggie",
      lastName: "Simpson",
      email: "maggie@simpson.com",
      password: "secret"
    };
    const returnedUser = await playlistService.createUser(newUser);
    assert(lodash.some([returnedUser], testUser), "returnedUser must be a superset of newUser");
    assert.isDefined(returnedUser._id);

  });

  test("get user", async function() {

    const u1 = await playlistService.createUser(newUser);
    const u2 = await playlistService.getUser(u1._id);
    assert.isNotNull(u1);
    assert.isNotNull(u2);
    assert.deepEqual(u1, u2);

  });

  // test("get non existent user", async function() {
  //   try {
  //     const u1 = await playlistService.getUser("3aea486f-7757-47d4-a088-4604b57c90fc");
  //     assert.fail("Failed to respond to non existent user");
  //   } catch (error) {
  //     assert(error.response.data.statusCode == 404, "Incorrect Response Code");
  //     assert(error.response.data.error === "Not Found", "Incorrect Response Error");
  //     assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
  //   }
  // });
  //
  // test("get with invalid user id", async function() {
  //   try {
  //     const u1 = await playlistService.getUser("this is not a uuid");
  //     assert.fail("Failed to respond invalid user id");
  //   } catch (error) {
  //     assert(error.response.data.statusCode == 400, "Incorrect Response Code");
  //     assert(error.response.data.error === "Bad Request", "Incorrect Response Error");
  //     assert(error.response.data.message === "Invalid request params input", "Incorrect Response Message");
  //   }
  // });
  //
  // test("delete a user", async function() {
  //   try {
  //     let u = await playlistService.createUser(newUser);
  //     assert(u.id != null);
  //     await playlistService.deleteUser(u.id);
  //     u = await playlistService.getUser(u.id);
  //     assert.fail("User should have been deleted");
  //   } catch (error) {
  //     assert(error.response.data.statusCode == 404, "Incorrect Response Code");
  //     assert(error.response.data.error === "Not Found", "Incorrect Response Error");
  //     assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
  //   }
  // });
  //
  // test("get all users", async function() {
  //   await playlistService.deleteAllUsers();
  //   await playlistService.createUser(newUser);
  //   for (let u of users) {
  //     await playlistService.createUser(u);
  //   }
  //   const allUsers = await playlistService.getUsers();
  //   assert.equal(allUsers.length, users.length + 1);
  // });
  //
  // test("get users detail", async function() {
  //   await playlistService.deleteAllUsers();
  //   const user = await playlistService.createUser(newUser);
  //   for (let u of users) {
  //     await playlistService.createUser(u);
  //   }
  //
  //   const testUser = {
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     password: user.password
  //   };
  //   users.unshift(testUser);
  //   const allUsers = await playlistService.getUsers();
  //   for (var i = 0; i < users.length; i++) {
  //     assert(lodash.some([allUsers[i]], users[i]), "returnedUser must be a superset of newUser");
  //   }
  // });
  //
  // test("authenticate success", async function() {
  //   await playlistService.createUser(newUser);
  //   const credentials = {
  //     email: newUser.email,
  //     password: newUser.password
  //   };
  //   const result = await playlistService.authenticate(credentials);
  //   assert.equal(result.email, newUser.email, "Email matched");
  //   assert.isNotNull(result.id, "got an id");
  // });
  //
  // test("authenticate fail", async function() {
  //   try {
  //     const credentials = {
  //       email: "noone@here.com",
  //       password: "secret"
  //     };
  //     const result = await playlistService.authenticate(credentials);
  //     fail("Invalid credentials not detected");
  //   } catch (error) {
  //     assert.equal(error.response.data.statusCode, 401, "Incorrect Response Code");
  //   }
  // });
});
