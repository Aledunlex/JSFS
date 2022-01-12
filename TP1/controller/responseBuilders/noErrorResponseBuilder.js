import { GeneralResponseBuilderHTML } from './generalResponseBuilderHTML.js';

export class NoErrorResponseBuilder extends GeneralResponseBuilderHTML {

    constructor(pathname, message) {
        super(pathname, message);
        this.determineStatus('200');
    }

}