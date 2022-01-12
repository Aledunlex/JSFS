import { ResponseBuilder } from '../responseBuilder.js';
import { readFileSync, accessSync, constants } from 'fs';

export class ResponserBuilderResource extends ResponseBuilder {

    constructor(pathname) {
        super(pathname);
        this.response = this.determineResponse();
    }

    determineResponseType() {
        return `text/plain`;
    }

    determineResponse() {
        try {
            const path = this._request;
            accessSync(path, constants.R_OK);
            this.determineStatus('200');
            return readFileSync(path , { encoding : 'UTF-8'});
        }
        catch(e) {
            this.determineStatus('404');
            console.log(e);
            return e.toString();
            }
        }

}