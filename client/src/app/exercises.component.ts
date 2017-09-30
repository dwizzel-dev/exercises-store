

import {Component } from '@angular/core'
import {TranslateService } from 'ng2-translate'

import {UserMsgComponent } from './usermsg.component'
import {SearchBoxComponent } from './searchbox.component'
import {Logger } from './logger.service'

@Component({
    moduleId: module.id.toString(),
    selector: 'exercises',
    templateUrl: './exercises.component.html',
    providers: [
        ]
})

export class ExercisesComponent{

    constructor(private logger:Logger, 
                private translate: TranslateService
        ){
        //this.logger.log('HistoricsComponent.constructor()');
        }

    ngOnInit(){
        //this.logger.log('HistoricsComponent.ngOnInit()');
    }
    
    ngAfterViewInit() {
        //this.logger.log('HistoricsComponent.ngAfterViewInit()'); 
    }

}


//END SCRIPT