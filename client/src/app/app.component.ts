

import {Component,
        HostBinding,
        Injector,
        ReflectiveInjector } from '@angular/core'
import {TranslateService } from 'ng2-translate'
import {ConfigService } from '@ngx-config/core';
import {Logger } from './logger.service'
import {HttpCallService } from './httpcall.module';


@Component({
  moduleId: module.id.toString(),
  selector: 'appz',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
    ],
  providers:[
    
  ]   
})
export class AppComponent { 

  
  private params:Object;

  constructor(private logger:Logger, 
              private translate: TranslateService, 
              private config:ConfigService
    ) {

    
    //constructor
    //this.logger.log('AppComponent.constructor()');
    
    //version
    this.logger.log('AppComponent.version: ' + this.config.getSettings().version);
    //add langs
    this.translate.addLangs(['en','fr']);
    //this language will be used as a fallback 
    //when a translation isn't found in the current language
    //so it wil load it before the other ones
    this.translate.setDefaultLang('en');
    //the lang to use, if the lang isn't available, 
    //it will use the current loader to get them
    let browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    //this.translate.use('en');
    //param to show 
    this.params = {
        version: this.config.getSettings().version
    };
    
  }

  ngOnViewInit(){
    

  }

  ngOnInit() {
    //this.logger.log('AppComponent.ngOnInit()');
  }
}


//END SCRIPT