import {createElement} from '../render.js';

const createPopupInnerTemplate = () => (
  '<div class="film-details__inner"></div>'
);

export default class PopupInnerView {
  #element = null;

  get template() {
    return createPopupInnerTemplate();
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
