
import {Observable
    } from 'rxjs/Observable'

export class HttpCallModel {
    pid:number;
    srv:string;
    obs:Observable<any[]>;
    timestamp:number;
    search:Object;
    attempt:number;
    owner:any;
}