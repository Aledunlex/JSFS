import { URL } from 'url';
import { NoErrorResponseBuilder } from './responseBuilders/noErrorResponseBuilder.js';
import { ErrorResponseBuilder } from './responseBuilders/errorResponseBuilder.js';
import { ResponseBuilderJSON } from './responseBuilders/responseBuilderJSON.js';
import { ResponserBuilderResource } from './responseBuilders/responseBuilderResource.js';

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
    const some_int = Math.floor(Math.random() * 101);

    // routage "à la main"
    const respBuilder = this.initResponseBuilder(value, color, date, some_int);
    
    this.response.statusCode = respBuilder.status;

    //if (respBuilder.responseType === 'HTML')
    this.response.write(respBuilder.response);

    this.response.end();
  }

  initResponseBuilder(value, color, date, some_int) {
    const path = this.#url.pathname;
    switch (path) {
      case '/first':
        return new NoErrorResponseBuilder(path, `<h2>P1</h2>`);

      case '/second':
        return new NoErrorResponseBuilder(path, `<h2>P2</h2>`);

      case '/json':
        const args = {value: value, color: color, date: date};
        return new ResponseBuilderJSON(path, args);

      case '/random':
        const args2 = {randomValue : some_int};
        return new ResponseBuilderJSON(path, args2);

      case '/public':
        return new ResponserBuilderResource(path+"/pouic.txt");

      default:
        return new ErrorResponseBuilder(path, `<h1>404 NOT FOUND</h1>`);
    }
  }

}