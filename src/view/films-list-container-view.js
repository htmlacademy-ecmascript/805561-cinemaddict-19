import {createElement} from '../render.js';

const createFilmslistContainerTemplate = () => ('<div class="films-list__container"></div>');

export default class FilmslistContainerView {
  #element = null;

  get template() {
    return createFilmslistContainerTemplate();
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
