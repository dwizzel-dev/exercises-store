

import {Component,
        Injector,
        ReflectiveInjector } from '@angular/core'
import {TranslateService } from 'ng2-translate'
import {ConfigService 
    } from '@ngx-config/core';

import {UserMsgComponent } from './usermsg.component'
import {SearchBoxComponent } from './searchbox.component'
import {UserMsgModel} from './models/usermsg.model'
import {SearchHistoryModel } from './models/searchhistory.model'
import {Logger } from './logger.service'

import {HttpCallService } from './httpcall.module';
import {HttpCallModel} from './models/httpcall.model'

import {ErrMsgService } from './errmsg.service'

@Component({
    moduleId: module.id.toString(),
    selector: 'historics',
    templateUrl: './historics.component.html',
    providers: [
        ErrMsgService
        ]
})

export class HistoricsComponent{

    private arrSearch:SearchHistoryModel[] = [];
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

    userMessage(str:string ='', style:string = ''){
        this.userMsg = {
            class: style,       
            value: str
        }; 
    }
   
    ngAfterViewInit() {
        //this.logger.log('HistoricsComponent.ngAfterViewInit()'); 
        this.translate.get('generic.loading').subscribe(str => {
            this.userMessage(str);
            this.getHistory();
        });
        
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

    private getHistory(){
        this.logger.log('HistoricsComponent.getHistory()');
        //le service
		//to generate a bad service call
        //let callSrv:HttpCallModel = this.call.getService(this.config.getSettings().api.test.badservice, this);
        let callSrv:HttpCallModel = this.call.getService(this.config.getSettings().api.search.history, this);
        //le last call pid
        this.lastCallPid = callSrv.pid;
        //this.logger.log(callSrv);    
        this.httpCallSubscriber(callSrv);
        

        
    }
}


//END SCRIPT