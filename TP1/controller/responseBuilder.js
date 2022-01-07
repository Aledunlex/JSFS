export class ResponseBuilder {

    #request;
    #response;
    #status;
    #responseType;

    constructor(pathname) {
        if (this.constructor === ResponseBuilder) {
            throw new Error("Can't instantiate abstract class");
        }
        this.#request = pathname;
        this.#status = this.determineStatus();
        this.#responseType = this.determineResponseType();
    }

    get response() {
        if (this.#response == null) 
            throw new Error("Response was not initialized by a ResponseBuilder");
        return this.#response;
    }

    set response(response) { this.#response = response;}

    get status() { return this.#status; }
    
    get responseType() { return this.#responseType; }

    determineResponse() {
        throw new Error("No response : Cannot be instantiated");
    }

    determineStatus() {
        throw new Error("No status : Cannot be instantiated");
    }

    determineResponseType() {
        throw new Error("No type : Cannot be instantiated");
    }

    static getDate() {
        return new Date(Date.now()).toISOString();
    }

}