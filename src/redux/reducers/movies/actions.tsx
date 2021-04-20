import { 
    SET_MOVIES,
    SET_MOVIES_CATEGORIES
   } from "../../action-types";
  
import MovieType from "../../../types/movie";

export const setMovies = (movies: MovieType[]) => ({
    type: SET_MOVIES,
    payload: { movies }
});


export const setMoviesCategories = (categories: string[]) => ({
    type: SET_MOVIES_CATEGORIES,
    payload: { categories }
});
