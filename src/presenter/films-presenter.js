import {render, remove} from '../framework/render.js';
import { sortDateDown, sortRatingDown} from '../utils.js';
import {SortType, UpdateType, UserAction} from '../const.js';
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


  #filmsContainer = mainElement;
  #filmsModel = null;
  #filmsComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmslistContainerView();
  #noFilmComponent = new NoFilmView();
  #sortComponent = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #showMoreButtonComponent = null;
  #filmCardPresenterList = new Map();
  #filmsCount = null;
  #watchedCount = null;
  #filterCounts = null;
  #currentSortType = SortType.DEFAULT;
  #profileComponent = null;
  #filterComponent = null;
  #footerStatisticsComponent = null;

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE_DOWN:
        return [...this.#filmsModel.films].sort(sortDateDown);
      case SortType.RATING_DOWN:
        return [...this.#filmsModel.films].sort(sortRatingDown);
    }
    return this.#filmsModel.films;
  }

  #renderFilms(films) {
    films.forEach((film) => this.#renderFilmCard(film));
  }

  #renderFilmsList = () => {
    const filmCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmCount, this.#renderedFilmCount));

    if(filmCount > 0){this.#renderSort();}

    if(filmCount > 0){
      render(this.#filmsComponent, this.#filmsContainer);
      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

      this.#renderFilms(films);
    }else{
      render(this.#noFilmComponent, this.#filmsComponent.element);
    }

    if (filmCount > this.#renderedFilmCount) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({
        onClick: this.#showMoreButtonClickHandler
      });
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    }
  };

  #clearFilmsList() {
    this.#filmCardPresenterList.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenterList.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
    remove(this.#noFilmComponent);
    remove(this.#sortComponent);
  }

  #renderMainFilmsContainer = () => {
    this.#filmsCount = this.#filmsModel.films.length;
    this.#watchedCount = this.#filmsModel.watchedCount;
    this.#filterCounts = this.#filmsModel.filterCounts;
    this.#profileComponent = new ProfileView(this.#watchedCount);
    this.#filterComponent = new FilterView(this.#filterCounts);
    this.#footerStatisticsComponent = new FooterStatisticsView(this.#filmsCount);

    render(this.#profileComponent, headerElement);
    render(this.#filterComponent, mainElement);
    render(this.#footerStatisticsComponent, footerElement);

    this.#renderFilmsList();
  };

  #clearMainFilmsContainer({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const taskCount = this.films.length;

    this.#filmCardPresenterList.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenterList.clear();

    remove(this.#noFilmComponent);

    this.#clearFilmsList();
    remove(this.#profileComponent);
    remove(this.#filterComponent);
    remove(this.#footerStatisticsComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(taskCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#clearFilmsList({resetRenderedFilmCount: true});
    this.#renderFilmsList();
  };

  #renderSort = () =>{
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, mainElement);
  };

  #showMoreButtonClickHandler = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handlePopupChange = () => {
    this.#filmCardPresenterList.forEach((presenter) => presenter.removePopup());
  };

  #handleViewAction = (actionType, updateType, update) => {
    //console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_FILM_CARD:
        this.#filmsModel.addFilm(updateType, update);
        break;
      case UserAction.DELETE_FILM_CARD:
        this.#filmsModel.deleteFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    //console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmCardPresenterList.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilmsList();
        this.#renderFilmsList();
        break;
      case UpdateType.MAJOR:
        this.#clearMainFilmsContainer({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderMainFilmsContainer();
        break;
    }
  };

  #renderFilmCard = (film) => {
    const filmCardPresenter = new FilmCardPresenter({
      filmsListContainer: this.#filmsListContainerComponent.element,
      onDataChange: this.#handleViewAction,
      onPopupChange: this.#handlePopupChange,
    });
    filmCardPresenter.init(film);
    this.#filmCardPresenterList.set(film.id, filmCardPresenter);
  };

  init = () => {
    this.#renderMainFilmsContainer();
  };

}
