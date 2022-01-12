import { GeneralResponseBuilderHTML } from './generalResponseBuilderHTML.js';

export class ErrorResponseBuilder extends GeneralResponseBuilderHTML {

    constructor(pathname, message) {
        super(pathname, message);
        this.determineStatus('404');
    }

}