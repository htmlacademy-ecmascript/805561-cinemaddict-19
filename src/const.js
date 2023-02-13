const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  RATING_DOWN: 'rating-down',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const UserAction = {
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATE_FILM_CARD: 'UPDATE_FILM_CARD',
  UPDATE_FILM_CARD_DETAIL: 'UPDATE_FILM_CARD_DETAIL',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const AUTHORIZATION = 'Basic bR7akO25zyA9wr3j';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

export {SortType, FilterType, UserAction, UpdateType, AUTHORIZATION, END_POINT};
