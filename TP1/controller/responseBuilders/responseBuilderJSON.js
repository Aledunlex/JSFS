import { ResponseBuilder } from '../responseBuilder.js';

export class ResponseBuilderJSON extends ResponseBuilder {

    _args;

    constructor(pathname, args) {
        super(pathname);
        this._args = args;
        this.response = this.determineResponse();
    }

    determineResponseType() {
        return `JSON`;
    }

    determineResponse() {
        return JSON.stringify(this._args);
    }

    determineStatus() {
        return `200`;
    }

}