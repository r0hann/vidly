import { combineReducers } from "redux";
import movies from "./moviesReducer";
import genres from "./genresReducer";

const rootReducer = combineReducers({
  genres,
  movies
});

export default rootReducer;
