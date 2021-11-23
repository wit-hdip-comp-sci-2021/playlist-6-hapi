import { assert } from "chai";
import * as fixtures from "./fixtures.json";
import { PlaylistService } from "./playlist-service.js";
import { isSubset } from "./test-utils.js";

suite("User API tests", () => {
  const { users } = fixtures.default;
  const { newUser } = fixtures.default;

  const playlistService = new PlaylistService(fixtures.default.playlistService);

  suiteSetup(async () => {
    await playlistService.deleteAllUsers();
  });

  suiteTeardown(async () => {
    await playlistService.deleteAllUsers();
  });

  test("create a user", async () => {
    const testUser = {
      firstName: "Maggie",
      lastName: "Simpson",
      email: "maggie@simpson.com",
      password: "secret",
    };
    const returnedUser = await playlistService.createUser(newUser);
    assert(isSubset(testUser, returnedUser), "returnedUser must be a superset of newUser");
    assert.isDefined(returnedUser._id);
  });

  test("get user", async () => {
    const u1 = await playlistService.createUser(newUser);
    const u2 = await playlistService.getUser(u1._id);
    assert.isNotNull(u1);
    assert.isNotNull(u2);
    assert.deepEqual(u1, u2);
  });

  test("get non existent user", async () => {
    try {
      const u1 = await playlistService.getUser("3aea486f-7757-47d4-a088-4604b57c90fc");
      assert.fail("Failed to respond to non existent user");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });

  test("delete a user", async () => {
    try {
      let u = await playlistService.createUser(newUser);
      assert(u._id != null);
      await playlistService.deleteUser(u._id);
      u = await playlistService.getUser(u._id);
      assert.fail("User should have been deleted");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });

  test("get all users", async () => {
    await playlistService.deleteAllUsers();
    await playlistService.createUser(newUser);
    // eslint-disable-next-line no-restricted-syntax
    for (const u of users) {
      // eslint-disable-next-line no-await-in-loop
      await playlistService.createUser(u);
    }
    const allUsers = await playlistService.getUsers();
    assert.equal(allUsers.length, users.length + 1);
  });

  test("get users detail", async () => {
    await playlistService.deleteAllUsers();
    const user = await playlistService.createUser(newUser);
    // eslint-disable-next-line no-restricted-syntax
    for (const u of users) {
      // eslint-disable-next-line no-await-in-loop
      await playlistService.createUser(u);
    }

    const testUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    users.unshift(testUser);
    const allUsers = await playlistService.getUsers();
    for (let i = 0; i < users.length; i += 1) {
      assert(isSubset(users[i], allUsers[i]), "returnedUser must be a superset of newUser");
    }
  });

  test("authenticate success", async () => {
    await playlistService.createUser(newUser);
    const credentials = {
      email: newUser.email,
      password: newUser.password,
    };
    const result = await playlistService.authenticate(credentials);
    assert.equal(result.email, newUser.email, "Email matched");
    assert.isNotNull(result.id, "got an id");
  });

  test("authenticate fail", async () => {
    try {
      const credentials = {
        email: "noone@here.com",
        password: "secret",
      };
      const result = await playlistService.authenticate(credentials);
      fail("Invalid credentials not detected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401, "Incorrect Response Code");
    }
  });
});
