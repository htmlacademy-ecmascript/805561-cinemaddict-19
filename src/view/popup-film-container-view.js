import {humanizeDate} from '../utils.js';
import AbstractView from '../framework/view/abstract-view';

const createPopupFilmContainerTemplate = (film) => {

  const {
    filmInfo:{
      title,
      alternativeTitle,
      totalRating,
      poster,
      ageRating,
      director,
      writers,
      actors,
      release: {
        date,
        releaseCountry
      },
      runtime,
      genre,
      description,
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    }
  } = film;

  const template = 'DD MMM YYYY';
  const humanizedDate = date !== null
    ? humanizeDate(date, template)
    : '';

  const FavoriteClassName = favorite
    ? 'film-details__control-button--active'
    : '';

  const WatchlistClassName = watchlist
    ? 'film-details__control-button--active'
    : '';

  const AlreadyWatchedClassName = alreadyWatched
    ? 'film-details__control-button--active'
    : '';

  return ( `
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${poster}" alt="">
            <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizedDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${genre}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button"
                class="film-details__control-button  film-details__control-button--watchlist ${WatchlistClassName}"
                id="watchlist" name="watchlist">Add to watchlist
        </button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${AlreadyWatchedClassName}" id="watched"
                name="watched">Already watched
        </button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${FavoriteClassName}" id="favorite"
                name="favorite">Add to favorites
        </button>
      </section>
    </div>`
  );
};

export default class PopupFilmsContainerView extends AbstractView {

  #film = null;
  #handlePopupClose = null;
  #handleFavoriteClick = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handlePopupRerender = null;

  constructor({film, onClick, onFavoriteClick, onWatchlistClick, onAlreadyWatchedClick, onPopupRerender}) {
    super();
    this.#film = film;
    this.#handlePopupClose = onClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handlePopupRerender = onPopupRerender;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#popupCloseHandler);

    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#alreadyWatchedClickHandler);
  }

  get template() {
    return createPopupFilmContainerTemplate(this.#film);
  }

  #popupCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handlePopupClose();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick(this.#film);
    this.#handlePopupRerender(this.#film);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchlistClick(this.#film);
    this.#handlePopupRerender(this.#film);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAlreadyWatchedClick(this.#film);
    this.#handlePopupRerender(this.#film);
  };

}
