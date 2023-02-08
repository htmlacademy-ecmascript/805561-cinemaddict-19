import { generateComment} from '../mock/film.js';
import Observable from '../framework/observable.js';

export default class CommentModel extends Observable {
  #comments = Array.from({length: 20}, generateComment);

  get comments() {
    return this.#comments;
  }

  /*updateComment(updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      update,
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  }*/

  addComment(updateType, update) {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    console.log(update);
    console.log(this.#comments);
    //const index = this.#comments.findIndex((comment) => comment.id === update.id);
    const index = this.#comments.findIndex((comment) => Number(comment.id) === Number(update));

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
    console.log(this.#comments);

    this._notify(updateType);
  }
}
