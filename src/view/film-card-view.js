import {humanizeDate} from '../utils';
import AbstractView from '../framework/view/abstract-view';

const createFilmCardTemplate = (filmCard) => {

  const {
    comments,
    filmInfo: {
      title,
      totalRating,
      description,
      poster,
      genre,
      runtime,
      release:{date}
    }
  } = filmCard;

  const template = 'YYYY';
  const humanizedDate = date !== null
    ? humanizeDate(date, template)
    : '';

  const fragment = new DocumentFragment();
  genre.forEach((element) => {
    const g = `<span class="film-details__genre">${element}</span>`;
    fragment.append(g);
  });
  const genres = fragment.textContent;

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${humanizedDate}</span>
          <span class="film-card__duration">${runtime}</span>
          <span class="film-card__genre">${genres}</span>
        </p>
        <img src="./${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>>`
  );
};

export default class FilmCardView extends AbstractView {
  #filmCard = null;
  #handlePopupOpen = null;

  constructor({film, onClick}) {
    super();
    this.#filmCard = film;
    this.#handlePopupOpen = onClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#popupOpenHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#filmCard);
  }

  #popupOpenHandler = (evt) => {
    evt.preventDefault();
    this.#handlePopupOpen(this.#filmCard);
  };

}
