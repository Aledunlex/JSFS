// fichier ./third/controller/requestController.js
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
    this.response.setHeader( 'Content-Type' , 'text/html');
  }

  buildResponse()  {
    const value = this.#url.searchParams.get('value') || 'unknown';
    const color = this.#url.searchParams.get('color') || 'unknown';

    // routage "à la main"
    if (this.#url.pathname == '/first') {
        this.response.write(`<h2>c la page first</h2>`);
    }
    else if (this.#url.pathname == '/second')
      this.response.write(`<p>c la page second></p>`);
    
    else if (this.#url.pathname == '/json')
      console.log(JSON.stringify({color : color, value : value}));
    
    else {
        this.response.statusCode = 404;
        this.response.write(`<p>NOT FOUND</p>`);
    }

    this.response.end();
  }

}