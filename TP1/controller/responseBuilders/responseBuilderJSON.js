import { ResponseBuilder } from '../responseBuilder.js';

export class ResponseBuilderJSON extends ResponseBuilder {

    _value;
    _color;
    _date;

    constructor(pathname, value, color, date) {
        super(pathname);
        this._value = value;
        this._color = color;
        this._date = date;
        this.response = this.determineResponse();
    }

    determineResponseType() {
        return `JSON`;
    }

    determineResponse() {
        return JSON.stringify({ value: this._value, color: this._color, date: this._date });
    }

    determineStatus() {
        return `200`;
    }

}