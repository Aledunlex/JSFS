import { ResponseBuilder } from '../responseBuilder.js';
import FileReaderSync from 'fs';

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

            let txtFile = "./public/pouic.txt";
            let str = FileReaderSync.readFileSync(txtFile,'utf8');
            // FileReaderSync.accessSync( File(this._request), FileReaderSync.constants.R_OK );
            // return FileReaderSync.readAsDataURL(this._request);
        }
        catch(e) {
            console.log(e);
            return "";
        }
    }

    determineStatus() {
        return `200`;
    }

}