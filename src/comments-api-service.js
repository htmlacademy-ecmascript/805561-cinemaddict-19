import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  POST : 'POST ',
  DELETE  : 'DELETE  ',
};

export default class CommentsApiService extends ApiService {
  getComments(film) {
    return this._load({url: `comments/${film.id}`})
      .then(ApiService.parseResponse);
  }

  async updateComment(film) {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(film),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
