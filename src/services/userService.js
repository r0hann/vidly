import http from "./httpService";
import config from "../config.json";

export function registerUser(user) {
  return http.post(`${config.apiUrl}/users`, {
    email: user.username,
    name: user.name,
    password: user.password
  });
}
