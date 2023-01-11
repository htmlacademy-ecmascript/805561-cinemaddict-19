import {createElement} from '../render.js';

const createPopupWrapperTemplate = () => (
  '<section class="film-details"></section>'
);

export default class PopupWrapperView {
  #element = null;

  get template() {
    return createPopupWrapperTemplate();
  }

  get element() {
    if (!this. #element) {
      this. #element = createElement(this.template);
    }

    return this. #element;
  }

  removeElement() {
    this. #element = null;
  }
}
