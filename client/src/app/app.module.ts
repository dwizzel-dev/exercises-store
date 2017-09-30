/**
 * node_modules
 */

import {Http
        } from '@angular/http'

import {ConfigModule, 
        ConfigLoader, 
        ConfigService 
      } from '@ngx-config/core';
import {ConfigHttpLoader 
      } from '@ngx-config/http-loader';	  
     
import {NgModule,
        APP_INITIALIZER 
      } from '@angular/core'
      
import {BrowserModule 
        } from '@angular/platform-browser'

import {TranslateModule, 
        TranslateLoader, 
        TranslateStaticLoader, 
        TranslateService 
      } from 'ng2-translate'
       
 
      

/**
 * local appz
 * 
 */

import {HttpCallModule,
        HttpCallService
      } from './httpcall.module'
import {AppComponent } from './app.component'
import {CategoriesComponent } from './categories.component'
import {HistoricsComponent } from './historics.component'
import {PopularsComponent } from './populars.component'
import {UserMsgComponent } from './usermsg.component'
import {SearchBoxComponent} from './searchbox.component'
import {FilterBoxComponent} from './filterbox.component'
import {CheckBoxComponent} from './checkbox.component'
import {CheckBoxDirective} from './checkbox.directive'
import {ExercisesComponent} from './exercises.component'
import {Logger } from './logger.service'


export function translateFactory(http:Http):TranslateStaticLoader {
  //console.log(__filename + ' function.translateFactory()');
  return new TranslateStaticLoader(http, 'http://127.0.0.2/assets/i18n', '.json');
}

export function configFactory(http: Http):ConfigLoader {
  //console.log(__filename + ' function.configFactory()');
  return new ConfigHttpLoader(http, 'http://127.0.0.2/assets/config/config.json'); 
}

@NgModule({
  imports: [ 
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: (configFactory),
	    deps: [Http]
	}),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (translateFactory),
      deps: [Http]
    }),
    HttpCallModule.forRoot({
      provide: HttpCallService,
      deps: [Http, ConfigService]
    }),
    BrowserModule
    ],
  declarations: [ 
    AppComponent,
    CategoriesComponent,
    ExercisesComponent,
    HistoricsComponent,
    PopularsComponent,
    UserMsgComponent,
    CheckBoxComponent,
    CheckBoxDirective,
    SearchBoxComponent,
    FilterBoxComponent
    ],
  providers: [
    Logger
  ],
  bootstrap: [ 
    AppComponent 
    ]
})

export class AppModule {}
  



//END SCRIPT