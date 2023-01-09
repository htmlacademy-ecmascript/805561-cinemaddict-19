import {generateFilm, generateComment} from '../mock/film.js';

export default class PopupModel {
  #film = generateFilm();
  #comments = Array.from({length: 20}, generateComment);

  getDetailFilm() {
    return this.#film;
  }

  getComments() {
    return this.#comments;
  }
}

