import { Users } from "./app/api/users.js";
import { Playlists } from "./app/api/playlists.js";
import { Tracks } from "./app/api/tracks.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "POST", path: "/api/users/authenticate", config: Users.authenticate },

  { method: "GET", path: "/api/playlists", config: Playlists.find },
  { method: "GET", path: "/api/playlists/{id}", config: Playlists.findOne },
  { method: "POST", path: "/api/playlists", config: Playlists.create },
  { method: "DELETE", path: "/api/playlists/{id}", config: Playlists.deleteOne },
  { method: "DELETE", path: "/api/playlists", config: Playlists.deleteAll },

  { method: "GET", path: "/api/tracks", config: Tracks.find },
  { method: "POST", path: "/api/playlists/{id}/tracks", config: Tracks.create },
  { method: "DELETE", path: "/api/tracks", config: Tracks.deleteAll },
];
