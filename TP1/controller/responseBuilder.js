export class ResponseBuilder {

    _request;
    _response;
    _status;
    _responseType;

    constructor(pathname) {
        if (this.constructor === ResponseBuilder) {
            throw new Error("Can't instantiate abstract class");
        }
        this._request = pathname;
        this._status = this.determineStatus();
        this._responseType = this.determineResponseType();
    }

    get response() {
        if (this._response == null) 
            throw new Error("Response was not initialized by a ResponseBuilder");
        return this._response;
    }

    set response(response) { this._response = response;}

    get status() { return this._status; }
    
    get responseType() { return this._responseType; }

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