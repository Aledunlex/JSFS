import { ResponseBuilder } from '../responseBuilder.js';
import { HTML_TYPE } from '../builderConstants.js';

export class GeneralResponseBuilderHTML extends ResponseBuilder {

    _message;

    constructor(pathname, message) {
        super(pathname);
        this._message = message;
        this.response = this.determineResponse();
    }

    get message() { return this._message; }
    set message(message) { this._message = message; }

    determineResponseType() {
        return HTML_TYPE;
    }

    determineResponse() {
        return this.buildHead() + this._message + this.buildFooter() + this.decorate() + this.closeHTML();
    }

    buildHead() {
        return `<html>\n\t<head></head>\n\t<body>\n\t\t`;
    }

    buildFooter() {
        return `\n\t\t<footer>${ResponseBuilder.getDate()}</footer>`;
    }

    closeHTML() {
        return `\n\t</body>\n</html>`;
    }

    decorate() {
        return `<link href="./public/style/style.css" rel="stylesheet" type="text/css"></link> 
        \n<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">`;
    }

}