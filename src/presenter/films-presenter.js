import {render} from '../framework/render.js';

import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmslistContainerView from '../view/films-list-container-view.js';
//import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
//import CommentModel from '../model/comment-model.js';
//import PopupPresenter from '../presenter/popup-presenter.js';
import NoFilmView from '../view/no-film-view';
import ProfileView from '../view/profile-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import FooterStatisticsView from '../view/footer-statistics-view';
import FilmCardPresenter from './film-card-presenter';


const FILM_COUNT_PER_STEP = 5;
//const bodyElement = document.body;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

export default class FilmsPresenter {

  //#commentModel = new CommentModel();
  #filmsContainer = null;
  #filmsModel = null;
  #films = null;
  #filmsComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmslistContainerView();
  #noFilmComponent = new NoFilmView();
  //#popupPresenter = new PopupPresenter(bodyElement, this.#commentModel);
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #showMoreButtonComponent = null;
  #filmCardPresenter = null;

  #filmsCount = 0;
  #favoriteCount = 0;
  #filterCounts = 0;

  #renderFilms(from, to) {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film, this. #filmsListContainerComponent));
  }

  #renderMainFilmsContainer = (filmsContainer, filmsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#filmsCount = this.#filmsModel.films.length;
    this.#favoriteCount = this.#filmsModel.favoriteCount;
    this.#filterCounts = this.#filmsModel.filterCounts;

    render(new ProfileView(this.#favoriteCount), headerElement);
    render(new FilterView(this.#filterCounts), mainElement);
    render(new FooterStatisticsView(this.#filmsCount), footerElement);

    if(this.#films.length > 0){
      render(new SortView(), mainElement);
      render(this.#filmsComponent, this.#filmsContainer);
      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

      this.#renderFilms(0, FILM_COUNT_PER_STEP);
    }else{
      render(this.#noFilmComponent, this.#filmsComponent.element);
    }

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({
        onClick: this.#showMoreButtonClickHandler
      });
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    }
  };

  #showMoreButtonClickHandler = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  /*#openPopup = (film) => {
    this.#popupPresenter.init(film);
    bodyElement.classList.add('hide-overflow');
  };

  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView({
      film,
      onClick: this.#openPopup,
    });

    render(filmCardComponent, this.#filmsListContainerComponent.element);
  };
*/
  #renderFilmCard = (film) => {
    this.#filmCardPresenter = new FilmCardPresenter({filmsListContainer: this.#filmsListContainerComponent.element});
    this.#filmCardPresenter.init(film);
  };

  init = (filmsContainer, filmsModel) => {
    this.#renderMainFilmsContainer(filmsContainer, filmsModel);
  };

}
