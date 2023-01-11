import {generateFilm, generateComment} from '../mock/film.js';

export default class PopupModel {
  #film = generateFilm();
  #comments = Array.from({length: 20}, generateComment);

  get detailFilm() {
    return this.#film;
  }

  get comments() {
    return this.#comments;
  }
}

