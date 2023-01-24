import AbstractView from '../framework/view/abstract-view';

const createPopupWrapperTemplate = () => (
  '<section class="film-details"></section>'
);

export default class PopupWrapperView extends AbstractView{
  get template() {
    return createPopupWrapperTemplate();
  }

}
