import { generateComment} from '../mock/film.js';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class CommentModel extends Observable {
  #commentsApiService = null;
  //#comments = Array.from({length: 20}, generateComment);
  #comments = [];

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;

    /*this.#commentsApiService.comments.then((comments) => {
      console.log(comments);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });*/
  }

  get comments() {
    return this.#comments;
  }

  async init(film) {
    try {
      const comments = await this.#commentsApiService.getComments(film);
      //this.#comments = comments.map(this.#adaptToClient);
      this.#comments = comments;
    } catch(err) {
      this.#comments = [];
    }
    console.log(this.#comments);
    //this._notify(UpdateType.INIT);
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
    const index = this.#comments.findIndex((comment) => Number(comment.id) === Number(update));

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  }


}
