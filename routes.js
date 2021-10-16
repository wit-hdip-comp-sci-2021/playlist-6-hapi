"use strict";

import { accountsController } from "./app/controllers/accounts-controller.js";
import { dashboardController } from "./app/controllers/dashboard-controller.js";
import { aboutController } from "./app/controllers/about-controller.js";
import { playlistController } from "./app/controllers/playlist-controller.js";
import { songController } from "./app/controllers/song-controller.js";

export const routes = [
  { method: "GET", path: "/", handler: accountsController.index, options: { auth: false } },
  { method: "GET", path: "/login", handler: accountsController.login, options: { auth: false } },
  { method: "GET", path: "/signup", handler: accountsController.signup, options: { auth: false } },
  { method: "POST", path: "/authenticate", handler: accountsController.authenticate, options: { auth: false } },
  { method: "POST", path: "/register", handler: accountsController.register, options: { auth: false } },

  { method: "GET", path: "/logout", handler: accountsController.logout },
  { method: "GET", path: "/dashboard", handler: dashboardController.index },
  { method: "POST", path: "/dashboard/deleteplaylist/{id}", handler: dashboardController.deletePlaylist },
  { method: "GET", path: "/dashboard/addplaylist", handler: dashboardController.addPlaylist },

  { method: "GET", path: "/about", handler: aboutController.index },
  { method: "GET", path: "/playlist/{id}", handler: playlistController.index },
  { method: "GET", path: "/playlist/{id}/deletesong/{songid}", handler: playlistController.deleteSong },
  { method: "POST", path: "/playlist/{id}/addsong", handler: playlistController.addSong },

  { method: "GET", path: "/song/{id}/editsong/{songid}", handler: songController.index },
  { method: "POST", path: "/song/{id}/updatesong/{songid}", handler: songController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];

