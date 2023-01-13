import { generateComment} from '../mock/film.js';

export default class CommentModel {
  #comments = Array.from({length: 20}, generateComment);

  get comments() {
    return this.#comments;
  }
}
