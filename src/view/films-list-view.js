import {createElement} from '../render.js';

const createFilmslistTemplate = () => (
  ` <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
);

export default class FilmsListView {
  #element = null;

  get template() {
    return createFilmslistTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
