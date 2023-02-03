import PopupWrapperView from '../view/popup-wrapper-view.js';
import PopupInnerView from '../view/popup-inner-view.js';
import PopupFilmContainerView from '../view/popup-film-container-view.js';
import PopupCommentsContainerView from '../view/popup-comments-container-view.js';
import {render, remove} from '../framework/render';

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

  closePopup = () => {
    /*this.#PopupWrapperComponent.element.remove();
    this.#PopupWrapperComponent.removeElement();
    this.#PopupInnerComponent.element.remove();
    this.#PopupInnerComponent.removeElement();
    this.#popupFilmContainer.element.remove();
    this.#popupFilmContainer.removeElement();
    this.#popupCommentsContainer.element.remove();
    this.#popupCommentsContainer.removeElement();*/

    this.destroy();

    this.bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown',this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
  };

  #renderPopup = (film) => {
    this.#film = film;
    this.#comments = [...this.#popupModel.comments];

    this.#popupFilmContainer = new PopupFilmContainerView({
      film,
      onClick: this.closePopup
    });

    this.#popupCommentsContainer = new PopupCommentsContainerView(this.#film, this.#comments);

    document.addEventListener('keydown',this.#escKeyDownHandler);

    render(this.#PopupWrapperComponent, this.#popupContainer);
    render(this.#PopupInnerComponent, this.#PopupWrapperComponent.element);

    render(this.#popupFilmContainer, this.#PopupInnerComponent.element);
    render(this.#popupCommentsContainer, this.#PopupInnerComponent.element);

  };

  init = (film) => {
    this.#renderPopup(film);
  };

  destroy() {
    remove(this.#PopupWrapperComponent);
    remove(this.#PopupInnerComponent);
    remove(this.#popupFilmContainer);
    remove(this.#popupCommentsContainer);
  }
}
