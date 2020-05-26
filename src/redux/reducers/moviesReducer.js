import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function moviesReducer(state = initialState.movies, action) {
  switch (action.type) {
    case types.LOAD_MOVIES_SUCCESS:
      return action.movies;
    case types.DELETE_MOVIE_SUCCESS:
      return state.filter(movie => movie._id !== action.movie._id);
    case types.DELETE_MOVIE_FAILURE:
      return state;
    case types.RELOAD_MOVIES:
      return action.movies;
    default:
      return state;
  }
}
