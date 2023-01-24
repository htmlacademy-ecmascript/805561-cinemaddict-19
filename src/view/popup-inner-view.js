import AbstractView from '../framework/view/abstract-view';

const createPopupInnerTemplate = () => (
  '<div class="film-details__inner"></div>'
);

export default class PopupInnerView extends AbstractView {

  get template() {
    return createPopupInnerTemplate();
  }

}
