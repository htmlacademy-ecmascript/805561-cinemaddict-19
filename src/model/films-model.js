import {generateFilm} from '../mock/film.js';
import Observable from '../framework/observable.js';

const FILM_COUNT = 27;

export default class FilmsModel extends Observable {
  #films = Array.from({length: FILM_COUNT}, generateFilm);

  get films () {
    return this.#films;
  }

  get filterCounts () {
    return this.#countFilter(this. #films);
  }

  get watchedCount () {
    const filters = this.#countFilter(this. #films);
    return filters.alreadyWatched;
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

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addFilm(updateType, update) {
    this.#films = [
      update,
      ...this.#films,
    ];

    this._notify(updateType, update);
  }

  deleteFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
