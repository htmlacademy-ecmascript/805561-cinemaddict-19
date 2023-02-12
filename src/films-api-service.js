import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  async updateFilm(film) {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(film) {

    const {filmInfo, userDetails} = film;

    // eslint-disable-next-line camelcase
    const user_details = {
      ...userDetails,
      'already_watched': userDetails.alreadyWatched,
      'watching_date': userDetails.watchingDate,
    };
    const release = {
      ...filmInfo.release,
      'release_country': filmInfo.release.releaseCountry,
    };
    // eslint-disable-next-line camelcase
    const film_info = {
      ...filmInfo,
      'alternative_title': filmInfo.alternativeTitle,
      'total_rating': filmInfo.totalRating,
      'age_rating': filmInfo.ageRating,
      'duration': filmInfo.runtime,
      release
    };

    const adaptedFilm = {...film,
      // eslint-disable-next-line camelcase
      film_info,
      // eslint-disable-next-line camelcase
      user_details,
    };


    delete adaptedFilm.userDetails;
    delete adaptedFilm.user_details.alreadyWatched;
    delete adaptedFilm.user_details.watchingDate;
    delete adaptedFilm.film_info.release.releaseCountry;
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.film_info.alternativeTitle;
    delete adaptedFilm.film_info.totalRating;
    delete adaptedFilm.film_info.ageRating;
    delete adaptedFilm.film_info.runtime;

    return adaptedFilm;

  }

}
