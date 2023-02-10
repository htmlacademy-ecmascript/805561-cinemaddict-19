import {render, remove, replace} from '../framework/render';
import {UserAction, UpdateType} from '../const.js';
import PopupPresenter from './popup-presenter';
import FilmCardView from '../view/film-card-view';
import CommentModel from '../model/comment-model';

const bodyElement = document.body;


export default class FilmCardPresenter {

  #commentModel = new CommentModel();
  #handleDataChange = null;
  #popupPresenter = null;
  #filmsListContainer = null;
  #filmComponent = null;
  #handlePopupChange = null;

  constructor({filmsListContainer, onDataChange, onPopupChange}) {
    this.#filmsListContainer = filmsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handlePopupChange = onPopupChange;

    this.#commentModel.addObserver(this.#handleModelEvent);
  }

  #openPopup = (film) => {
    this.#popupChangeHendler();
    this.#popupPresenter.init(film);
    bodyElement.classList.add('hide-overflow');
  };

  removePopup() {
    //if (запилить исключение для уже открытого попапа) {
    this.#popupPresenter.closePopup();
    //}
  }

  init = (film) => {
    this.#popupPresenter = new PopupPresenter({
      popupContainer: bodyElement,
      commentModel: this.#commentModel,
      onDataChange: this.#handleViewAction,
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
        // и из массива айдишников комментов фильма убрать айдишник удаленного коммента
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // eslint-disable-next-line no-console
    console.log(updateType, data);

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        // this.#filmCardPresenterList.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        //this.#clearFilmsList();
        //this.#renderFilmsList();
        //console.log('обновить список комментов');
        break;
      case UpdateType.MAJOR:
        // - обновить весь попап
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
