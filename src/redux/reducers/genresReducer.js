import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function genresReducer(state = initialState.genres, action) {
  switch (action.type) {
    case types.LOAD_GENRES_SUCCESS:
      return action.genres;
    default:
      return state;
  }
}
