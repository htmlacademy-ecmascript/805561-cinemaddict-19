import {render, remove, replace} from '../framework/render';
import PopupPresenter from './popup-presenter';
import FilmCardView from '../view/film-card-view';
import CommentModel from '../model/comment-model';

const bodyElement = document.body;

export default class FilmCardPresenter {
  #commentModel = new CommentModel();
  #popupPresenter = new PopupPresenter(bodyElement, this.#commentModel);
  #filmsListContainer = null;
  #filmComponent = null;
  #handleDataChange = null;

  constructor({filmsListContainer, onDataChange}) {
    this.#filmsListContainer = filmsListContainer;
    this.#handleDataChange = onDataChange;
  }

  #openPopup = (film) => {
    this.#popupPresenter.init(film);
    bodyElement.classList.add('hide-overflow');
  };

  init = (film) => {
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

  #handleFavoriteClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleDataChange({...newFilm, userDetails: {...userDetails, favorite: !film.userDetails.favorite } });
  };

  #handleWatchlistClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleDataChange({...newFilm, userDetails: {...userDetails, watchlist: !film.userDetails.watchlist } });
  };

  #handleAlreadyWatchedClick = (film) => {
    const newFilm = structuredClone(film);
    const {userDetails} = film;

    this.#handleDataChange({...newFilm, userDetails: {...userDetails, alreadyWatched: !film.userDetails.alreadyWatched } });
  };

  destroy() {
    remove(this.#filmComponent);
  }

}
