import * as types from "./actionTypes";
import { getGenres } from "../../services/genreService";

export function loadGenresSuccess(genres) {
  return { type: types.LOAD_GENRES_SUCCESS, genres };
}

export function loadGenres() {
  return async function(dispatch) {
    try {
      const { data } = await getGenres();
      dispatch(loadGenresSuccess(data));
    } catch (error) {
      throw error;
    }
  };
}
