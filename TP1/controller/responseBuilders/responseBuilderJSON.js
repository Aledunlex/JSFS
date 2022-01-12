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
        try {
            this.determineStatus('200');
            return JSON.stringify(this._args);
        }
        catch(e) {
            this.determineStatus('404');
            console.log(e);
            return e.toString();
        }
    }

}