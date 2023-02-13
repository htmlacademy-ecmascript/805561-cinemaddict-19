import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  POST : 'POST',
  DELETE  : 'DELETE',
};

export default class CommentsApiService extends ApiService {

  getComments(film) {
    return this._load({url: `comments/${film.id}`})
      .then(ApiService.parseResponse);
  }

  async addComment({filmId, newComment}) {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(newComment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteComment(commentId) {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });

    return response;
  }

}
