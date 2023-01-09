import {createElement} from '../render.js';

const createFilmslistContainerTemplate = () => ('<div class="films-list__container"></div>');

export default class FilmslistContainerView {
  getTemplate() {
    return createFilmslistContainerTemplate();
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
