export class ResponseBuilder {

    #request;
    #response;
    #status;
    #responseType;

    /**
    @constructor
    @abstract
    */
    constructor(pathname) {
        if (this.constructor === ResponseBuilder) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.#request = pathname;
        this.#response = this.determineResponse();
        this.#status = this.determineStatus();
        this.#responseType = this.determineResponseType();
    }

    get response() { return this.#response; }
    get status() { return this.#status; }
    get responseType() { return this.#responseType; }

    /**
    @abstract
    */
    determineResponse() {
        throw new Error("No response : Cannot be instantiated");
    }

    /**
    @abstract
    */
    determineStatus() {
        throw new Error("No status : Cannot be instantiated");
    }

    /**
    @abstract
    */
    determineResponseType() {
        throw new Error("No type : Cannot be instantiated");
    }

    static getDate() {
        return new Date(Date.now()).toISOString();
    }

}