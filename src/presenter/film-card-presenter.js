import {render, remove, replace} from '../framework/render';
import {UserAction, UpdateType, END_POINT, AUTHORIZATION} from '../const.js';
import PopupPresenter from './popup-presenter';
import FilmCardView from '../view/film-card-view';
import CommentModel from '../model/comment-model';
import CommentsApiService from '../comments-api-service';


const bodyElement = document.body;

export default class FilmCardPresenter {
  #commentModel = new CommentModel({
    commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)
  });

  #filmsModel = null;
  #handleDataChange = null;
  #popupPresenter = null;
  #filmsListContainer = null;
  #filmComponent = null;
  #handlePopupChange = null;

  constructor({filmsListContainer, onDataChange, onPopupChange, filmsModel }) {
    this.#filmsListContainer = filmsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handlePopupChange = onPopupChange;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  #openPopup = (film) => {
    this.#popupChangeHendler();
    this.#popupPresenter.init(film);
    bodyElement.classList.add('hide-overflow');
  };

  removePopup() {
    this.#popupPresenter.closePopup();
  }

  init = (film) => {
    this.#commentModel.init(film);

    this.#popupPresenter = new PopupPresenter({
      popupContainer: bodyElement,
      commentModel: this.#commentModel,
      onDataChange: this.#handleViewAction,
      filmsModel: this.#filmsModel,
    });

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView({
      film,
      onClick: this.#openPopup,
      onFavoriteClick: this.#handleFavoriteClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
    });

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmsListContainer);
      return;
    }

    if (this.#filmsListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this.#commentModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentModel.deleteComment(updateType, update);
        break;
      case UserAction.UPDATE_FILM_CARD_DETAIL:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, ) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.init();
        break;
      case UpdateType.MAJOR:
        this.init();
        break;
    }
  };

  #handleFavoriteClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleDataChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MAJOR,
      {...newFilm, userDetails: {...userDetails, favorite: !film.userDetails.favorite } },
    );
  };

  #handleWatchlistClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleDataChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MAJOR,
      {...newFilm, userDetails: {...userDetails, watchlist: !film.userDetails.watchlist } },
    );
  };

  #handleAlreadyWatchedClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleDataChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MAJOR,
      {...newFilm, userDetails: {...userDetails, alreadyWatched: !film.userDetails.alreadyWatched } },
    );
  };

  #popupChangeHendler = () => {
    this.#handlePopupChange();
  };

  destroy() {
    remove(this.#filmComponent);
  }

}
