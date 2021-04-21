import ReducerActionType from '../../reducer-action-type'; 

const moviesReducer = (state = {
  movies: [],
  categories: [ ]
}, action : ReducerActionType) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload.movies
      };
    case 'SET_MOVIES_CATEGORIES':
      return {
        ...state,
        categories: action.payload.categories
      };
    default:
      return state;
  }
}
  
export default moviesReducer;
  