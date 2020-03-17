import Movie from './models/movie.js';
import Comment from './models/comment.js';

const SUCCESS_STATUS = {
  MIN: 200,
  MAX: 226
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= SUCCESS_STATUS.MIN && response.status < SUCCESS_STATUS.MAX) {
    return response;
  } else {
    throw new Error(`${response.status}:${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endpoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endpoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
