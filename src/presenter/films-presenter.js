import {render, remove} from '../framework/render.js';
import {updateItem} from '../utils.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmslistContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view';
import ProfileView from '../view/profile-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import FooterStatisticsView from '../view/footer-statistics-view';
import FilmCardPresenter from './film-card-presenter';


const FILM_COUNT_PER_STEP = 5;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

export default class FilmsPresenter {

  #filmsContainer = null;
  #filmsModel = null;
  #films = null;
  #filmsComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmslistContainerView();
  #noFilmComponent = new NoFilmView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #showMoreButtonComponent = null;
  //#filmCardPresenter = null;
  #filmCardPresenterList = new Map();
  #filmsCount = null;
  #favoriteCount = null;
  #filterCounts = null;


  #renderFilmsList(from, to) {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film, this. #filmsListContainerComponent));
  }

  #clearFilmsList() {
    this.#filmCardPresenterList.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenterList.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
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

      this.#renderFilmsList(0, FILM_COUNT_PER_STEP);
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
    this.#renderFilmsList(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmCardPresenterList.get(updatedFilm.id).init(updatedFilm);
  };

  #renderFilmCard = (film) => {
    const filmCardPresenter = new FilmCardPresenter({
      filmsListContainer: this.#filmsListContainerComponent.element,
      onDataChange: this.#handleFilmChange,
    });

    filmCardPresenter.init(film);
    this.#filmCardPresenterList.set(film.id, filmCardPresenter);
  };

  init = (filmsContainer, filmsModel) => {
    this.#renderMainFilmsContainer(filmsContainer, filmsModel);
  };

}
