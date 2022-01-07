import { ResponseBuilder } from '../responseBuilder.js';

export class GeneralResponseBuilderHTML extends ResponseBuilder {

    constructor(pathname, message) {
        super(pathname);
    }

    determineResponseType() {
        return `HTML`;
    }

    determineResponse() {
        return this.buildHead() + this.buildSpecificMessage() + this.buildFooter() + this.closeHTML();
    }

    buildSpecificMessage(message) {
        console.log(message);
        return message;
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