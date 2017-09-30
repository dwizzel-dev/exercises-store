

import {Component,
        Input } from '@angular/core'
import {Logger} from './logger.service'
import {UserMsgModel} from './models/usermsg.model'

@Component({
    moduleId: module.id.toString(),
    selector: 'usermsg',
    templateUrl: './usermsg.component.html',
    styleUrls: [
        './usermsg.component.css'
        ]
})

export class UserMsgComponent{
    
    @Input() usermsgParams:UserMsgModel;
    
    constructor(private logger:Logger){
        //this.logger.log('UserMsgComponent.constructor()'); 
    }

   

}


//END SCRIPT