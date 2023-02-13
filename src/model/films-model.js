//import {generateFilm} from '../mock/film.js';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const';

//const FILM_COUNT = 27;

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  //#films = Array.from({length: FILM_COUNT}, generateFilm);
  #films = [];

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;

    /*this.#filmsApiService.films.then((films) => {
      //console.log(films);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
      console.log(films.map(this.#adaptToClient));
    });*/
  }

  get films () {
    return this.#films;
  }

  async init() {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch(err) {
      this.#films = [];
    }
    this._notify(UpdateType.INIT);
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

  async updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    /*this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);*/

    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);

      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];

      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  /*addFilm(updateType, update) {
    this.#films = [
      update,
      ...this.#films,
    ];

    this._notify(updateType, update);
  }*/

  /* deleteFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType);
  }*/

  #adaptToClient(film) {
    // eslint-disable-next-line camelcase
    const {film_info, user_details} = film;

    const userDetails = {
      // eslint-disable-next-line camelcase
      ...user_details,
      // eslint-disable-next-line camelcase
      alreadyWatched: user_details['already_watched'],
      // eslint-disable-next-line camelcase
      watchingDate: user_details['watching_date'],
    };
    const release = {
      // eslint-disable-next-line camelcase
      ...film_info.release,
      // eslint-disable-next-line camelcase
      releaseCountry: film_info.release['release_country'],
    };
    const filmInfo = {
      // eslint-disable-next-line camelcase
      ...film_info,
      // eslint-disable-next-line camelcase
      alternativeTitle: film_info['alternative_title'],
      // eslint-disable-next-line camelcase
      totalRating: film_info['total_rating'],
      // eslint-disable-next-line camelcase
      ageRating: film_info['age_rating'],
      // eslint-disable-next-line camelcase
      runtime: film_info['duration'],
      release
    };

    const adaptedFilm = {...film,
      filmInfo,
      userDetails,
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo['duration'];
    delete adaptedFilm.filmInfo.release['release_country'];

    delete adaptedFilm['user_details'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];

    return adaptedFilm;
  }

}
