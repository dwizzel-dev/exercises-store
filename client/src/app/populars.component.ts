

import {Component,
        Injector,
        ReflectiveInjector } from '@angular/core'
import {TranslateService } from 'ng2-translate'
import {ConfigService 
    } from '@ngx-config/core';

import {UserMsgComponent } from './usermsg.component'
import {SearchBoxComponent } from './searchbox.component'
import {UserMsgModel} from './models/usermsg.model'
import {SearchPopularModel } from './models/searchpopular.model'
import {Logger } from './logger.service'

import {HttpCallService } from './httpcall.module';
import {HttpCallModel} from './models/httpcall.model'

import {ErrMsgService } from './errmsg.service'

@Component({
    moduleId: module.id.toString(),
    selector: 'populars',
    templateUrl: './populars.component.html',
    providers: [
        ErrMsgService
        ]
})

export class PopularsComponent{

    private arrSearch:SearchPopularModel[] = [];
    private userMsg:UserMsgModel;
    private lastCallPid:number = 0;
    
    constructor(private logger:Logger, 
                private translate: TranslateService,
                private config:ConfigService, 
                private call:HttpCallService,
                private errMsg:ErrMsgService
        ){
        //user messgae
        this.userMessage();
    }

    
    ngAfterViewInit() {
        this.translate.get('generic.loading').subscribe(str => {
            this.userMessage(str);;
            this.getPopular();
        });
        
    }

    userMessage(str:string = '', style:string = ''){
        this.userMsg = {
            class: style,       
            value: str
        }; 
    }

    httpCallSubscriber(callsrv:HttpCallModel){
        callsrv.obs.subscribe(arr => {
            this.logger.log('timer:' + (new Date().getTime() - callsrv.timestamp));
            this.logger.log('pid:' + callsrv.pid);
            //this.logger.log(callsrv);
            //si pas le dernier alors ne pas traiter 
            //les autres qui peuvent etre asynchrone
            if(this.lastCallPid == callsrv.pid){
                this.logger.log(arr);
                this.userMessage();
                this.arrSearch = arr;
            }else{
                this.logger.log('rejected pid:' + callsrv.pid);
            }
            
            
        }, err => {
            //console.warn(err);
            //console.log('callSrv PID:' + callsrv.pid);
            this.logger.warn(err);
            this.errMsg.onConnError('connection', err, callsrv);
        });

    }

    private getPopular(){
        this.logger.log('PopularsComponent.getPopular()');
        //le service
		//to generate json error test
        //let callSrv:HttpCallModel = this.call.getService(this.config.getSettings().api.test.badjson, this);
		let callSrv:HttpCallModel = this.call.getService(this.config.getSettings().api.search.popular, this);
        this.lastCallPid = callSrv.pid;
        //le last call pid
        //this.logger.log(callSrv);    
        this.httpCallSubscriber(callSrv);
        

        
    }
}


//END SCRIPT