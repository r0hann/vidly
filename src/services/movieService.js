import http from "./httpService";
import { apiMovieUrl } from "../config.json";

function getMovieUrl(id) {
  return `${apiMovieUrl}/${id}`;
}

export function getMovies() {
  return http.get(apiMovieUrl);
}

export function deleteMovie(id) {
  return http.delete(getMovieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(getMovieUrl(movie._id), body);
  }
  return http.post(apiMovieUrl, movie);
}

export function getMovie(movieId) {
  return http.get(getMovieUrl(movieId));
}
