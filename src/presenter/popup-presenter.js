import PopupWrapperView from '../view/popup-wrapper-view.js';
import PopupInnerView from '../view/popup-inner-view.js';
import PopupFilmContainerView from '../view/popup-film-container-view.js';
import PopupCommentsContainerView from '../view/popup-comments-container-view.js';
import {render, remove} from '../framework/render';
import {UpdateType, UserAction} from '../const';

export default class PopupPresenter {
  #popupContainer = null;
  #commentModel = null;
  #handleDataChange = null;
  #film = null;
  #comments = null;
  #popupFilmContainer = null;
  #popupCommentsContainer = null;

  #PopupWrapperComponent = new PopupWrapperView;
  #PopupInnerComponent = new PopupInnerView;
  bodyElement = document.body;

  constructor({popupContainer, commentModel, onDataChange}) {
    this.#popupContainer = popupContainer;
    this.#commentModel = commentModel;
    this.#handleDataChange = onDataChange;
  }

  closePopup = () => {
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
    this.#comments = [...this.#commentModel.comments];

    this.#popupFilmContainer = new PopupFilmContainerView({
      film,
      onClick: this.closePopup,
    });

    const commentContainerData = {
      film: this.#film,
      commentsData: this.#comments,
    };

    this.#popupCommentsContainer = new PopupCommentsContainerView({
      commentContainerData,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    document.addEventListener('keydown',this.#escKeyDownHandler);

    render(this.#PopupWrapperComponent, this.#popupContainer);
    render(this.#PopupInnerComponent, this.#PopupWrapperComponent.element);
    render(this.#popupFilmContainer, this.#PopupInnerComponent.element);
    render(this.#popupCommentsContainer, this.#PopupInnerComponent.element);

  };

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.MAJOR,
      update,
    );
  };

  #handleDeleteClick = (comment) => {
    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      comment,
    );
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
