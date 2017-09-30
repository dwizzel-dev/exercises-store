

import {NgModule, 
        ModuleWithProviders,
        Injectable,
        Inject 
    } from '@angular/core';
import {Http, 
        Headers,
        Request,
        Response,
        RequestOptionsArgs,
        RequestMethod,
        RequestOptions
    } from '@angular/http';
import {Observable
    } from 'rxjs/Observable'
import {ConfigService 
    } from '@ngx-config/core';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


import {HttpCallModel
    } from './models/httpcall.model'



@NgModule({})
export class HttpCallModule {

    
    static forRoot(obj?: any): ModuleWithProviders {
        return {
            ngModule: HttpCallModule,
            providers: [HttpCallService]
        };
    }

    

}

@Injectable()
export class HttpCallService{

    private processId:number;
    private host:string;
    private port:number;
    private retryWhen:number;
    private timeout:number;
    
    //for testing calls
    private delay:number = 0;
    private async:boolean = false;
    private substract:number = 0;

    constructor(
        private http:Http, 
        private config:ConfigService
        ){

        //console.warn('HttpCallService.constructor()'); 
        //local
        this.processId = 100;
        //by config
        this.host = this.config.getSettings().api.http.host;
        this.port = this.config.getSettings().api.http.port;
        this.retryWhen = this.config.getSettings().api.http.retry;
        this.timeout = this.config.getSettings().api.http.timeout;
        //by config for test
        this.async = this.config.getSettings().api.test.async;
        this.substract = this.config.getSettings().api.test.substract;
        //si async alors on rajoute le delai
        if(this.async){
            this.delay = this.config.getSettings().api.test.delay;
        }
        
        
        
        
    }

    private getProcessId(){
        return this.processId++;
    }

    public callService(service:string, pid:number, search:Object):Observable<any[]>{

        //console.warn('++= callService');
        //console.log(service);
        //console.log(pid);
        //console.log(search);

        //test asynchrone
        if(this.async){
            this.delay -= this.substract;    
        }

        let url:string =  this.host + ':' + this.port + service;
        var req = new Request(
            new RequestOptions({
                url: url,
                method: RequestMethod.Get,
                search: search,
                headers: this.createAuthHeaders(),
                body: null
                })
            );

         return this.http
            .request(req)
            .retryWhen((error) => {
                //no retry let the caller handle the error                
                throw {code:'ERR404'};    
                //with retry
                //return error.delay(this.retryWhen);
            })
            .timeoutWith(this.timeout, Observable.throw({code:'ERR001'}))
            .map((res:Response) => {
                if(res.status != 200){
                    throw {code:'ERR' + res.status};    
                }else{
                    try{
                        return res.json();
                    }catch(e){
                        throw {code:'ERR900'};
                    }
                }
            })
            .catch((error:any) => {
                return Observable.throw(error);
            })
            .delay(this.delay);
            
            
  
    }

    public getService(service:string, owner:any, search:Object = {}):HttpCallModel{
        let pid = this.getProcessId();
        let callSrv:HttpCallModel = {
            pid: pid,
            srv: service,
            obs: this.callService(service, pid, search),
            timestamp: new Date().getTime(),
            search: search,
            attempt:0,
            owner: owner
        };
        return callSrv;

    }

    private createAuthHeaders(): Headers{
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });

        /*
        if(this.userService.user) {
            headers.set('Authorization', this.identityService.user.token);
        }
        */
        return headers;
    }
        
    
    
            
    
}



//END SCRIPT