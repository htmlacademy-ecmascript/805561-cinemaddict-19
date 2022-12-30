import {createElement} from '../render.js';

const createPopupWrapperTemplate = () => (
  '<section class="film-details"></section>'
);

export default class PopupWrapperView {
  getTemplate() {
    return createPopupWrapperTemplate();
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
