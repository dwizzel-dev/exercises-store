

import {Component,
        Input,
        Output,
        OnChanges,
        SimpleChange,
        EventEmitter 
        } from '@angular/core'
import {Logger} from './logger.service'
import {FilterBoxModel} from './models/filterbox.model'

@Component({
    moduleId: module.id.toString(),
    selector: 'filterbox',
    templateUrl: './filterbox.component.html',
    styleUrls: [
        './filterbox.component.css'
        ]
})

export class FilterBoxComponent implements OnChanges{

    @Input() filterboxParams:FilterBoxModel;
    @Output() onChangeInputValue = new EventEmitter<string>();
    
    constructor(private logger:Logger){
        //this.logger.log('FilterBoxComponent.constructor()');
    }

    onKey(value:string){
        this.logger.log('FilterBoxComponent.onKey(' + value + ')');
        //pour avoir une cocordance avec le parent qui initie le filterbox
        this.filterboxParams.value = value;
        //on emet un event a ceux qui ecoute
        this.onChangeInputValue.emit(value);
    }

    ngOnInit() {
        //this.logger.log('FilterBoxComponent.ngOnInit()'); 
    }

    ngAfterViewInit() {
        //this.logger.log('FilterBoxComponent.ngAfterViewInit()'); 
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        //this.logger.log('FilterBoxComponent.ngOnChanges()'); 
    }
    

}



//END SCRIPT