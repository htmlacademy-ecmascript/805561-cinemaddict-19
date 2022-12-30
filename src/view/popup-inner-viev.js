import {createElement} from '../render.js';

const createPopupInnerTemplate = () => (
  '<div class="film-details__inner"></div>'
);

export default class PopupInnerView {
  getTemplate() {
    return createPopupInnerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
