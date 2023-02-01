import {render} from '../framework/render';
import PopupPresenter from './popup-presenter';
import FilmCardView from '../view/film-card-view';
import CommentModel from '../model/comment-model';

const bodyElement = document.body;

export default class FilmCardPresenter {
  #commentModel = new CommentModel();
  #popupPresenter = new PopupPresenter(bodyElement, this.#commentModel);
  #filmsListContainer = null;

  constructor({filmsListContainer}) {
    this.#filmsListContainer = filmsListContainer;
  }

  #openPopup = (film) => {
    this.#popupPresenter.init(film);
    bodyElement.classList.add('hide-overflow');
  };

  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView({
      film,
      onClick: this.#openPopup,
    });

    render(filmCardComponent, this.#filmsListContainer);
  };

  init = (film) => {
    this.#renderFilmCard(film);
  };

}
