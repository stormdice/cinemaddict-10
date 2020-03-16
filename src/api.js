const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
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
}
