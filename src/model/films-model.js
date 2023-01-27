import {generateFilm} from '../mock/film.js';

const FILM_COUNT = 27;

export default class FilmsModel {
  #films = Array.from({length: FILM_COUNT}, generateFilm);

  get films () {
    return this.#films;
  }

  get filterCounts () {
    return this.#countFilter(this. #films);
  }

  get favoriteCount () {
    const filters = this.#countFilter(this. #films);
    return filters.favorite;
  }

  #countFilter = (films) => {
    const Filter = {
      watchlist: 0,
      alreadyWatched: 0,
      favorite: 0,
    };

    films.map(
      (film) => {
        for (const [key, value] of Object.entries(film.userDetails)) {
          if(value === true ) {
            Filter[key]++;
          }
        }
      }
    );

    return Filter;
  };

}
