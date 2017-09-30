

import {Injectable,
        Inject
    } from '@angular/core';
import {TranslateService} from 'ng2-translate' 
import {Logger} from './logger.service'
import {ConfigService} from '@ngx-config/core';
import {HttpCallModel} from './models/httpcall.model'
import {HttpCallService} from './httpcall.module';
      

@Injectable()
export class ErrMsgService {
    
    
    constructor(
        @Inject(Logger) private logger:Logger,
        private translate:TranslateService,
        private config:ConfigService,
        private call:HttpCallService      
        ){
    }
    
    public onConnError(type:string, err:any, callsrv:HttpCallModel){
      
        //show error in usrmsessage component
        callsrv.owner.userMessage(this.translate.instant('errorcode.connection.' + err.code), 'err');
        //recall untill max attempt reach
        if(callsrv.attempt < this.config.getSettings().api.retry.attempt){
            //le reconnect retry msg
            setTimeout(() => {
                //msg
                callsrv.owner.userMessage(this.translate.instant('errormsg.connection.retry', {count:this.config.getSettings().api.retry.delay/1000}), 'ok');    
            }, 1000);
            //le reconnect retry
            setTimeout(() => {
                //recall le service http en updatant le observer
                callsrv.obs = this.call.callService(
                    callsrv.srv, 
                    callsrv.pid, 
                    callsrv.search
                );
                callsrv.owner.httpCallSubscriber(callsrv);
                //console.log('+++ =callsrv.obs');
                //console.log(callsrv);
                //change le nbr attempt
                callsrv.attempt++;
            }, callsrv.owner.config.getSettings().api.retry.delay);
        }else{
            //nbr max attemps
            callsrv.owner.userMessage(this.translate.instant('errormsg.connection.maxattempt'), 'warn');
        }
   }
    
    
}
