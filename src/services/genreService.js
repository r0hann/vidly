import http from "./httpService";
import { apiGenreUrl } from "../config.json";

export function getGenres() {
  return http.get(apiGenreUrl);
}
