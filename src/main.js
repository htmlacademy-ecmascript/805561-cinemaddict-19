import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterModel from './model/filter-model';
import FilmsApiService from './films-api-service.js';
import {AUTHORIZATION, END_POINT} from './const';


const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter(filmsModel, filterModel);


filmsPresenter.init();
filmsModel.init();
