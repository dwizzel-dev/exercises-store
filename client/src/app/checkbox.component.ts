

import {Component,
        Input } from '@angular/core'
import {Logger} from './logger.service'
import {CheckBoxModel } from './models/checkbox.model'


@Component({
    moduleId: module.id.toString(),
    selector: 'checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: [
        './checkbox.component.css'
        ],
    
})

export class CheckBoxComponent{
    
    @Input() checkboxParams:CheckBoxModel;
    
    constructor(private logger:Logger){
        //this.logger.log('CheckBoxComponent.constructor()');   
    }

    onCheckboxStateChange(state:boolean){
         this.logger.log('CheckBoxComponent.onCheckboxStateChange(' + state + ')');
         this.checkboxParams.checked = state;
    }

    ngOnInit() {
        //this.logger.log('CheckBoxComponent.ngOnInit()'); 
    }

    ngAfterViewInit() {
        //this.logger.log('CheckBoxComponent.ngAfterViewInit()'); 
    }
    
    ngOnChanges(){
        //this.logger.log('CheckBoxComponent.ngOnChanges()'); 
    }
    
    

}


//END SCRIPT