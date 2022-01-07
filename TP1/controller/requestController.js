import { URL } from 'url';
import { NoErrorResponseBuilder } from './responseBuilders/noErrorResponseBuilder.js';
import { ErrorResponseBuilder } from './responseBuilders/errorResponseBuilder.js';

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
    const respBuilder = this.responseBody(value, color, date);
    
    this.response.statusCode = respBuilder.status;
    this.response.write(respBuilder.response);
    console.log(respBuilder.response);

    this.response.end();
  }

  buildHead() {
    this.response.write(`<html>\n\t<head></head>\n\t<body>\n\t\t`);
  }
  buildFooter(date) {
    this.response.write(`\n\t\t<footer>${date}</footer>`);
  }
  closeHTML() {
    this.response.write(`\n\t</body>\n</html>`);
  }


  responseBody(value, color, date) {
    const path = this.#url.pathname;
    switch (path) {
      case '/first':
        return new NoErrorResponseBuilder(path, `<h2>P1</h2>`);

      case '/second':
        return new NoErrorResponseBuilder(path, `<h2>P2</h2>`);

      case '/json':
        return {
          routeStr : JSON.stringify({ value: value, color: color, date: date }),
          routeCode : 202,
        };

      default:
        return new ErrorResponseBuilder(path, `<p>404 NOT FOUND</p>`);
    }
  }

}