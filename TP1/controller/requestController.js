import { URL } from 'url';
import { NoErrorResponseBuilder } from './responseBuilders/noErrorResponseBuilder.js';
import { ErrorResponseBuilder } from './responseBuilders/errorResponseBuilder.js';
import { ResponseBuilderJSON } from './responseBuilders/responseBuilderJSON.js';

export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
  }

  get response() { return this.#response; }

  handleRequest() {
    this.prepareResponse();
    this.buildResponse();
  }

  prepareResponse() {
    this.response.statusCode = 200;
    this.response.setHeader('Content-Type', 'text/html');
  }

  buildResponse()  {
    const value = this.#url.searchParams.get('value') || 'unknown';
    const color = this.#url.searchParams.get('color') || 'unknown';
    const date = new Date(Date.now()).toISOString();

    // routage "à la main"
    const respBuilder = this.initResponseBuilder(value, color, date);
    
    this.response.statusCode = respBuilder.status;

    if (respBuilder.responseType === 'HTML')
      this.response.write(respBuilder.response);

    this.response.end();
  }

  initResponseBuilder(value, color, date) {
    const path = this.#url.pathname;
    switch (path) {
      case '/first':
        return new NoErrorResponseBuilder(path, `<h2>P1</h2>`);

      case '/second':
        return new NoErrorResponseBuilder(path, `<h2>P2</h2>`);

      case '/json':
        return new ResponseBuilderJSON(path, value, color, date);

      default:
        return new ErrorResponseBuilder(path, `<h1>404 NOT FOUND</h1>`);
    }
  }

}