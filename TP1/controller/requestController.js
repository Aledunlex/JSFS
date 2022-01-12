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
    const path = this.#url.pathname;

    // routage "à la main"
    // respBuilder variable car réattribution si erreur
    var respBuilder = this.initResponseBuilder(path);
    
    this.response.statusCode = respBuilder.status;

    if (this.response.statusCode === '404')
      respBuilder = this.#errorBuilder(path);

    if (respBuilder.responseType === 'HTML')
      this.response.write(respBuilder.response);

    this.response.end();
  }

  initResponseBuilder(path) {
    //recuperation du premier mot de la requete; '/first/anything' renverra toujours vers '/first'
    const initPath = '/'+path.split('/')[1];
    switch (initPath) {
      case '/first':
        return new NoErrorResponseBuilder(path, `<h2>P1</h2>`);

      case '/second':
        return new NoErrorResponseBuilder(path, `<h2>P2</h2>`);

      case '/json':
        const value = this.#url.searchParams.get('value') || 'unknown';
        const color = this.#url.searchParams.get('color') || 'unknown';
        const date = new Date(Date.now()).toISOString();
        const args = {value: value, color: color, date: date};
        return new ResponseBuilderJSON(path, args);

      case '/random':
        const some_int = Math.floor(Math.random() * 101);
        const args2 = {randomValue : some_int};
        return new ResponseBuilderJSON(path, args2);

      case '/public':
        return new ResponserBuilderResource('.'+path);

      default:
        return this.#errorBuilder(path);
    }
  }

  #errorBuilder(path) {
    return new ErrorResponseBuilder(path, `<h1>404 NOT FOUND</h1>`);
  }

}