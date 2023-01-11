import {render} from '../render.js';

import PopupWrapperView from '../view/popup-wrapper-view.js';
import PopupInnerView from '../view/popup-inner-view.js';
import PopupFilmContainerView from '../view/popup-film-container-view.js';
import PopupCommentsContainerView from '../view/popup-comments-container-view.js';

export default class PopupPresenter {
  #popupContainer = null;
  #popupModel = null;
  #film = null;
  #comments = null;

  #PopupWrapperComponent = new PopupWrapperView;
  #PopupInnerComponent = new PopupInnerView;

  renderPopup = (popupContainer, popupModel) => {
    this.#popupContainer = popupContainer;
    this.#popupModel = popupModel;
    this.#film = this.#popupModel.detailFilm;
    this.#comments = [...this.#popupModel.comments];

    render(this.#PopupWrapperComponent, this.#popupContainer);
    render(this.#PopupInnerComponent, this.#PopupWrapperComponent.element);

    render(new PopupFilmContainerView(this.#film), this.#PopupInnerComponent.element);
    render(new PopupCommentsContainerView(this.#film, this.#comments), this.#PopupInnerComponent.element);
  };

  init = (popupContainer, popupModel) => {
    this.renderPopup(popupContainer, popupModel);
  };
}
