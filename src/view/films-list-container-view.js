import AbstractView from '../framework/view/abstract-view';

const createFilmslistContainerTemplate = () => ('<div class="films-list__container"></div>');

export default class FilmslistContainerView extends AbstractView {

  get template() {
    return createFilmslistContainerTemplate();
  }

}
