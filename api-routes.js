import { Users } from "./app/api/users.js";
import { Playlists } from "./app/api/playlists.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "POST", path: "/api/users/authenticate", config: Users.authenticate },
  { method: "POST", path: "/api/playlists", config: Playlists.create }
];
