import dayjs from 'dayjs';
import {FilterType} from './const';


const humanizeDate = (date, templete) => dayjs(date).format(templete);

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortDateDown(filmA, filmB) {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
}

function sortRatingDown(filmA, filmB) {
  return Number(filmB.filmInfo.totalRating) - Number(filmA.filmInfo.totalRating);
}

const filter = {
  [FilterType.ALL]: ((films) => films),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};


export {humanizeDate, sortDateDown, sortRatingDown, filter};
