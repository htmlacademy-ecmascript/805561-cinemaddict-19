import {render, RenderPosition} from '../render.js';

import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';


export default class FilmListPresenter {
  ShowMoreButton = new ShowMoreButtonView();

  renderFilmsList = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(),this.filmsContainer);
    }

    render(this.ShowMoreButton, this.filmsContainer, RenderPosition.AFTEREND);
  };

  init = (filmsContainer) => {
    this.renderFilmsList(filmsContainer);
  };
}


