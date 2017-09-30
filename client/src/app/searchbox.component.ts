

import {Component 
         } from '@angular/core'
import {Logger} from './logger.service'

@Component({
    moduleId: module.id.toString(),
    selector: 'searchbox',
    templateUrl: './searchbox.component.html',
    styleUrls: [
        './searchbox.component.css'
        ]
})

export class SearchBoxComponent{

    constructor(private logger:Logger){
        //this.logger.log('SearchBoxComponent.constructor()'); 
    }

    ngOnInit() {
        //this.logger.log('SearchBoxComponent.ngOnInit()'); 
    }

    ngAfterViewInit() {
        //this.logger.log('SearchBoxComponent.ngAfterViewInit()'); 
    }
    

}


//END SCRIPT