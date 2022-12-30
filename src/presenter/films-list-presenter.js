import {render} from '../render.js';

import FilmsContainer from '../view/films-container-viev.js';
import FilmslistView from '../view/films-list-view.js';
import FilmslistContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';


export default class FilmsPresenter {
  filmsComponent = new FilmsContainer();
  filmsListComponent = new FilmslistView();
  filmsListContainerComponent = new FilmslistContainerView();

  renderMainFilmsContainer = (filmsContainer, filmsModel) => {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.films = [...this.filmsModel.getFilms()];

    render(this.filmsComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    this.films.forEach((film) => {
      render(new FilmCardView(film), this.filmsListContainerComponent.getElement());
    });

    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());
  };

  init = (filmsContainer, filmsModel) => {
    this.renderMainFilmsContainer(filmsContainer, filmsModel);
  };
}


