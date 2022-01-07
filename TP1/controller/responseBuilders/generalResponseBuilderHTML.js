import { ResponseBuilder } from '../responseBuilder.js';

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
        return `HTML`;
    }

    determineResponse() {
        return this.buildHead() + this._message + this.buildFooter() + this.closeHTML();
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

}