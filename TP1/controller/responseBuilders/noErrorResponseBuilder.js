import { GeneralResponseBuilderHTML } from './generalResponseBuilderHTML.js';

export class NoErrorResponseBuilder extends GeneralResponseBuilderHTML {

    determineStatus() {
        return `200`;
    }

}