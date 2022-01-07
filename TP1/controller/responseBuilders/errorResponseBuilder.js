import { GeneralResponseBuilderHTML } from './generalResponseBuilderHTML.js';

export class ErrorResponseBuilder extends GeneralResponseBuilderHTML {

    determineStatus() {
        return `404`;
    }

}