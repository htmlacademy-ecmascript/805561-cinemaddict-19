import PopupWrapperView from '../view/popup-wrapper-view.js';
import PopupInnerView from '../view/popup-inner-view.js';
import PopupFilmContainerView from '../view/popup-film-container-view.js';
import PopupCommentsContainerView from '../view/popup-comments-container-view.js';
import {render, remove} from '../framework/render';
import {UpdateType, UserAction} from '../const';

export default class PopupPresenter {
  #popupContainer = null;
  #commentModel = null;
  #filmsModel = null;
  #handleDataChange = null;
  #handleFilmChange = null;
  #film = null;
  #comments = null;
  #popupFilmContainer = null;
  #popupCommentsContainer = null;

  #PopupWrapperComponent = new PopupWrapperView;
  #PopupInnerComponent = new PopupInnerView;
  bodyElement = document.body;

  constructor({popupContainer, commentModel, onDataChange, onFilmChange, filmsModel/*, comments*/}) {
    this.#popupContainer = popupContainer;
    this.#commentModel = commentModel;
    this.#handleDataChange = onDataChange;
    this.#handleFilmChange = onFilmChange;
    this.#filmsModel = filmsModel;
    //this.#comments = comments;

    //this.#filmsModel.addObserver(this.#rerenderpopupFilmContainer);
    this.#filmsModel.addObserver(this.#handleDataChange);
  }

  init = (film) => {
    this.#renderPopup(film);
  };

  #renderPopup = (film) => {
    this.#film = film;
    this.#comments = [...this.#commentModel.comments];

    this.#popupFilmContainer = new PopupFilmContainerView({
      film: this.#film,
      onClick: this.closePopup,
      onFavoriteClick: this.#handleFavoriteClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onPopupRerender: this.#rerenderpopupFilmContainer,
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

    //console.log(this.#popupCommentsContainer);
    this.#popupCommentsContainer.reset(commentContainerData);

    //console.log('renderPopup');
    //console.log(this.#film);
  };

  #rerenderpopupFilmContainer = (film) => {
    //console.log(film);
    //console.log(this.#filmsModel.films);
    const newFilm = this.#filmsModel.films.find((ithem) =>Number(ithem.id) === Number(film.id));
    //console.log('rerenderpopupFilmContainer');
    //console.log(newFilm);
    this.destroy()
    this.#renderPopup(newFilm);
  };

  closePopup = () => {
    //console.log('closePopup');
    //console.log(this.#popupCommentsContainer);
    /*this.#popupCommentsContainer.reset({
      film: this.#film,
      commentsData: this.#comments,
    })*/
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

  #handleFavoriteClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleFilmChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MAJOR,
      {...newFilm, userDetails: {...userDetails, favorite: !film.userDetails.favorite } },
    );
  };

  #handleWatchlistClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleFilmChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MAJOR,
      {...newFilm, userDetails: {...userDetails, watchlist: !film.userDetails.watchlist } },
    );
  };

  #handleAlreadyWatchedClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleFilmChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MAJOR,
      {...newFilm, userDetails: {...userDetails, alreadyWatched: !film.userDetails.alreadyWatched } },
    );
  };

  destroy() {
    remove(this.#PopupWrapperComponent);
    remove(this.#PopupInnerComponent);
    remove(this.#popupFilmContainer);
    remove(this.#popupCommentsContainer);
  }
}
