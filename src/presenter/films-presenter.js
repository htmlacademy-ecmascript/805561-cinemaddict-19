import {render} from '../render.js';

import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmslistContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import PopupModel from '../model/popup-model.js';
import PopupPresenter from '../presenter/popup-presenter.js';


export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #films = null;

  #filmsComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmslistContainerView();

  bodyElement = document.body;//криво как-то, этого здесь быть не должно, передавать откуда?
  commentModel = new PopupModel();
  popupPresenter = new PopupPresenter(this.bodyElement, this.commentModel);

  #renderMainFilmsContainer = (filmsContainer, filmsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#films.forEach((film) => {
      this.#renderFilmCard(film);
    });

    render(new ShowMoreButtonView(), this.#filmsListComponent.element);
  };

  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView(film);

    render(filmCardComponent, this.#filmsListContainerComponent.element);

    const openPopup = () => {
      this.popupPresenter.init(film);
      this.bodyElement.classList.add('hide-overflow');
    };

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup();
    });

  };

  init = (filmsContainer, filmsModel) => {
    this.#renderMainFilmsContainer(filmsContainer, filmsModel);
  };

}


