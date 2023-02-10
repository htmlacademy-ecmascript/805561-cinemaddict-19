import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterModel from './model/filter-model';


const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter(filmsModel, filterModel);


filmsPresenter.init();
