

import {Directive, 
        ElementRef, 
        Renderer,
        Output,
        EventEmitter, 
        HostListener} from '@angular/core'
import { Logger } from './logger.service'

@Directive({
    selector: '[checkbox]',
})

export class CheckBoxDirective{
    //checkbox state
    private checked:boolean;
    private disabled:boolean;
    //le state emitter
    @Output() onChangeCheckedState = new EventEmitter<boolean>();

    //label parent style of the checkbox to apply
    private checkedStyle:string = 'label-checked';
    private disabledStyle:string = 'label-disabled';
    private labelElement:Element;

    constructor(private el: ElementRef, 
                private rend: Renderer, 
                private logger:Logger
        ){
        //this.logger.log("CheckBoxDirective.constructor()");  
        this.labelElement = this.el.nativeElement.parentElement;  
    }

    ngOnInit() {
        //this.logger.log('CheckBoxDirective.ngOnInit()');
        this.checked = this.el.nativeElement.checked; 
    }

    ngAfterViewInit() {
        //this.logger.log('CheckBoxDirective.ngAfterViewInit()'); 
        this.checked = this.el.nativeElement.checked;
        this.disabled = this.el.nativeElement.disabled; 
        this.changeStyle();
    }

    private changeStyle(){
        this.rend.setElementClass(this.labelElement, this.checkedStyle, this.checked);
        this.rend.setElementClass(this.labelElement, this.disabledStyle, this.disabled);
    }

    @HostListener('change', ['$event.target.checked']) private onchange(state:boolean) {
         //this.logger.log("CheckBoxDirective.@HostListener('change') onchange(" + state + ")");
         this.checked = state;
         this.onChangeCheckedState.emit(this.checked);
         this.changeStyle();
        
    }

  
}


//END SCRIPT