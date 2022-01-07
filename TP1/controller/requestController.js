import { URL } from 'url';

export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
  }

  get response() {
    return this.#response;
  }

  handleRequest() {
    this.prepareResponse();
    this.buildResponse();
  }

  buildHead() {
    this.response.write(`<html><head></head><body>`);
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
    var routeStr;
    var routeCode;
    switch (this.#url.pathname) {
      case '/first' :
        routeStr = '<h2>P1</h2>';
        routeCode = 202;
        break;

      case '/second' :
        routeStr = '<p>P2</p>';
        routeCode = 202;
        break;
      
      case '/json' :
        routeStr = JSON.stringify({value : value, color : color, date : date});
        routeCode = 202; 
        break;
      
      default :
        routeCode = 404;
        routeStr = '<p>NOT FOUND</p>';
    }
    this.response.write(routeStr);
    this.response.statusCode = routeCode;

    this.response.end();
  }

}