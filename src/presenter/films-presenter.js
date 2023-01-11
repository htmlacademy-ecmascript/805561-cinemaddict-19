import {render} from '../render.js';

import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmslistContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';


export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #films = null;

  #filmsComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmslistContainerView();

  renderMainFilmsContainer = (filmsContainer, filmsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#films.forEach((film) => {
      //render(new FilmCardView(film), this.#filmsListContainerComponent.element);
      this.#renderFilmCard(film);
    });

    render(new ShowMoreButtonView(), this.#filmsListComponent.element);
  };

  init = (filmsContainer, filmsModel) => {
    this.renderMainFilmsContainer(filmsContainer, filmsModel);
  };

  #renderFilmCard = (film) => {
    const FilmCardComponent = new FilmCardView(film);

    render(FilmCardComponent, this.#filmsListContainerComponent.element);
  };


}


