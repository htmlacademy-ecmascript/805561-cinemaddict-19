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
  #popupFilmContainer = null;
  #popupCommentsContainer = null;

  #PopupWrapperComponent = new PopupWrapperView;
  #PopupInnerComponent = new PopupInnerView;
  bodyElement = document.body;

  constructor(popupContainer, commentModel) {
    this.#popupContainer = popupContainer;
    this.#popupModel = commentModel;
  }

  #renderPopup = (film) => {
    this.#film = film;
    this.#comments = [...this.#popupModel.comments];

    const closePopup = () => {
      this.#PopupWrapperComponent.element.remove();
      this.#PopupWrapperComponent.removeElement();
      this.#PopupInnerComponent.element.remove();
      this.#PopupInnerComponent.removeElement();
      this.#popupFilmContainer.element.remove();
      this.#popupFilmContainer.removeElement();
      this.#popupCommentsContainer.element.remove();
      this.#popupCommentsContainer.removeElement();

      this.bodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    this.#popupFilmContainer = new PopupFilmContainerView({
      film,
      onClick: () => {
        closePopup();
      }
    });

    this.#popupCommentsContainer = new PopupCommentsContainerView(this.#film, this.#comments);

    document.addEventListener('keydown', escKeyDownHandler);

    render(this.#PopupWrapperComponent, this.#popupContainer);
    render(this.#PopupInnerComponent, this.#PopupWrapperComponent.element);

    render(this.#popupFilmContainer, this.#PopupInnerComponent.element);
    render(this.#popupCommentsContainer, this.#PopupInnerComponent.element);

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
      }
    }

  };

  init = (film) => {
    this.#renderPopup(film);
  };
}
