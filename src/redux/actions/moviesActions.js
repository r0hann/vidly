import * as types from "./actionTypes";
import * as movieService from "../../services/movieService";

export function loadMoviesSuccess(movies) {
  return { type: types.LOAD_MOVIES_SUCCESS, movies };
}
export function deleteMovieSuccess(movie) {
  return { type: types.DELETE_MOVIE_SUCCESS, movie };
}
export function deleteMovieFailure() {
  return { type: types.DELETE_MOVIE_FAILURE };
}

export function getReloadMovies(movies) {
  return { type: types.RELOAD_MOVIES, movies };
}

export function loadMovies() {
  return async function(dispatch) {
    try {
      const { data } = await movieService.getMovies();
      dispatch(loadMoviesSuccess(data));
    } catch (error) {
      throw error;
    }
  };
}

export function deleteMovie(movie) {
  return async function(dispatch) {
    try {
      await movieService.deleteMovie(movie._id);
      dispatch(deleteMovieSuccess(movie));
    } catch (error) {
      throw error;
    }
  };
}

export function deleteMovieFailed() {
  return function(dispatch) {
    dispatch(deleteMovieFailure);
  };
}
export function reloadMovies(movies) {
  return function(dispatch) {
    dispatch(getReloadMovies(movies));
  };
}
