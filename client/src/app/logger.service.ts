import {Injectable} from '@angular/core';
import {ConfigService } from '@ngx-config/core';      

@Injectable()
export class Logger {
    
    private count:number = 0;
    
    constructor(
        private config:ConfigService      
        ){
        //this.log('Logger.constructor()');
    }
    
    public log(msg: any) {
        if(this.config.getSettings().logger){
            if(typeof(msg) == 'string' || typeof(msg) == 'number'){
                console.log((this.count++) + ': ' + msg); 
            }else{
                console.log((this.count++) + ': [');
                console.log(msg);
                console.log(']');
                
            }
            
        }
    }
    
    public error(msg: string) {
        console.error('[' + (this.count++) + ']: ' + msg);
    }
    
    public warn(msg: string) {
        if(this.config.getSettings().logger){
            if(typeof(msg) == 'string' || typeof(msg) == 'number'){
                console.warn((this.count++) + ': ' + msg);  
            }else{
                console.warn((this.count++) + ': [');
                console.warn(msg);
                console.warn(']');
            }
            
        }
        
    }

}
