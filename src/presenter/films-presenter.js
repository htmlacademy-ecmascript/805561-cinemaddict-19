import {render} from '../render.js';

import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmslistContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import CommentModel from '../model/comment-model.js';
import PopupPresenter from '../presenter/popup-presenter.js';
import NoFilmView from '../view/no-film-view';


const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  bodyElement = document.body;//все равно не могу понять)))

  #commentModel = new CommentModel();
  #filmsContainer = null;
  #filmsModel = null;
  #films = null;
  #filmsComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmslistContainerView();
  #noFilmComponent = new NoFilmView();
  #popupPresenter = new PopupPresenter(this.bodyElement, this.#commentModel);
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #showMoreButtonComponent = null;


  #renderMainFilmsContainer = (filmsContainer, filmsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];

    render(this.#filmsComponent, this.#filmsContainer);

    if(this.#films.length > 0){
      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

      this.#films.slice(0, FILM_COUNT_PER_STEP).forEach((film) => {
        this.#renderFilmCard(film);
      });
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
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilmCard = (film) => {

    const filmCardComponent = new FilmCardView({
      film,
      onClick: () => {
        openPopup.call(this);
        //мне не понятно, зачем было openPopup делать декларативной
        // и прибивать здесь гвоздями контекст с помощью .call ( у нас так в демопроекте https://github.com/htmlacademy-ecmascript/taskmanager-19/pull/4/commits/e8eef3cb2fc191c738294392e72d55abd9aadc25),
        //если  можно использовать стрелку, как  я это сделала в PopupPresenter например?
      }
    });

    function openPopup () {
      this.#popupPresenter.init(film);
      this.bodyElement.classList.add('hide-overflow');
    }

    render(filmCardComponent, this.#filmsListContainerComponent.element);

  };

  init = (filmsContainer, filmsModel) => {
    this.#renderMainFilmsContainer(filmsContainer, filmsModel);
  };

}
