import {Users} from "./app/api/users.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
];
