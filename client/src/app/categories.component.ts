

import {Component,
        Input,
        DoCheck,
        Injector,
        ReflectiveInjector } from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {TranslateService } from 'ng2-translate'
import {ConfigService 
    } from '@ngx-config/core';

import {UserMsgComponent } from './usermsg.component'
import {CategoryModel } from './models/category.model'
import {FilterBoxModel } from './models/filterbox.model'
import {CheckBoxModel } from './models/checkbox.model'
import {UserMsgModel} from './models/usermsg.model'
import {Logger } from './logger.service'


import {HttpCallService } from './httpcall.module';
import {HttpCallModel
    } from './models/httpcall.model'

import {RegexPermutationService} from './regexpermutation.service'
import {ErrMsgService } from './errmsg.service'


@Component({
    moduleId: module.id.toString(),
    selector: 'categories',
    templateUrl: './categories.component.html',
    styleUrls: [
        './categories.component.css'
        ],
    providers: [
        RegexPermutationService,
        ErrMsgService
        ]        
        
})

export class CategoriesComponent{

    private filterBox:FilterBoxModel;
    private arrFilteredCategories:CheckBoxModel[];
    private arrAllCategories:CheckBoxModel[];
    private userMsg:UserMsgModel;
    private userMsgCountResult:UserMsgModel;
    private isDataLoaded:boolean = false;
    private lastCallPid:number = 0;
    
    constructor(
                private logger:Logger, 
                private translate: TranslateService,
                private config:ConfigService,  
                private call:HttpCallService,
                private regPermutation:RegexPermutationService,
                private errMsg:ErrMsgService
        ){
        //this.logger.log('CategoriesComponent.constructor()');
        //if we have a pre filter for de category listing filterbox
        this.filterBox = {
            value: '',
            disabled: true,
            placeholder: ''
        };
        //le placeholder translation
        this.translate.get('filterbox.placeholder').subscribe(str => {
            this.filterBox.placeholder = str;        
        });
        //user messgae
        this.userMessage();
        this.userMessageCountResult('0');
    }

    onFilterboxInputValueChange(str:string){
         this.logger.log('CategoriesComponent.onFilterboxInputValueChange(' + str + ')');
         this.filterCategoriesToDisplay(str);
        
    }

    
    filterCategoriesToDisplay(str:string){
        this.logger.log('CategoriesComponent.filterCategoriesToDisplay(' + str + ')');
        //sinon on filtre selon la string input value
        if(str != ''){
            var strRegex = this.regPermutation.wordPermutation(this.regPermutation.split(str));
            //console.log('[1]: "' + strRegex + '"');
            //push       
            this.arrFilteredCategories = this.arrAllCategories
                .filter(function(obj:CheckBoxModel){
                    if(obj.label.match(new RegExp(this.reg, 'i')) != null){
                        return obj;
                    }
                }, {reg: strRegex});
            //console.log('count pass [1]:' + this.arrFilteredCategories.length); 
           
            //si vide on cherche juste si il y a 1 mot compose de au moins
            //2 carateres
            var arrStrWord = this.regPermutation.split(str);
            if(!this.arrFilteredCategories.length && arrStrWord.length == 1 && arrStrWord[0].length > 1){
                strRegex = this.regPermutation.wordSpace(arrStrWord[0]);
                //console.log('[2]: "' + strRegex + '"');
                //push       
                this.arrFilteredCategories = this.arrAllCategories
                    .filter(function(obj:CheckBoxModel){
                        //console.log(obj.label.match(new RegExp(this.reg, 'i')));
                        if(obj.label.match(new RegExp(this.reg, 'i')) != null){
                            return obj;
                        }
                    }, {reg: strRegex});
                //console.log('count pass [2]:' + this.arrFilteredCategories.length);
                     
                
            }
            //si toujours vide alors on enleve tout
            if(!this.arrFilteredCategories.length){
                this.arrFilteredCategories = [];
                //console.log('count pass [3]:' + this.arrFilteredCategories.length);
            }

        }else{
            this.arrFilteredCategories = this.arrAllCategories; 
        }
        //on affiche le count de result
        this.userMessageCountResult(this.arrFilteredCategories.length.toString());
    }

    userMessage(str:string = '', style:string = ''){
        this.userMsg = {
            class: style,       
            value: str
        }; 
    }

    userMessageCountResult(str:string = '', style:string = 'counter'){
        this.userMsgCountResult = {
            class: style,       
            value: str
        }; 
    }

    httpCallSubscriber(callsrv:HttpCallModel){
        callsrv.obs.subscribe(arr => {
            this.logger.log('timer:' + (new Date().getTime() - callsrv.timestamp));
            this.logger.log('pid:' + callsrv.pid);
            //this.logger.log(callsrv);
            //si pas le dernier alors ne pas traiter 
            //les autres qui peuvent etre asynchrone
            if(this.lastCallPid == callsrv.pid){
                this.logger.log(arr);
                //le flag du data loaded
                this.isDataLoaded = true;
                //le count des checked
                this.changeCheckedCatCount();
                //sort alphabetic
                arr.sort((a, b) => a.name.localeCompare(b.name));
                //init object for ngLoop of checkbox component
                this.arrFilteredCategories = [];
                this.arrAllCategories = [];
                for(var i=0;i<arr.length;i++){
                    var obj:CheckBoxModel = {
                        label: arr[i].name,
                        value: arr[i]._id,
                        checked: (arr[i].checked)? true : false,
                        disabled: (arr[i].activated)? false : true
                    };
                    this.arrAllCategories.push(obj);
                }
                //un duplicate
                this.arrFilteredCategories = this.arrAllCategories;
                //on enable le filterbox input
                this.filterBox.disabled = false;
                //on show le nombre de result
                this.userMessageCountResult(this.arrFilteredCategories.length.toString());
            }else{
                 this.logger.log('rejected pid:' + callsrv.pid);
            }
               
        }, err => {
            //console.warn(err);
            //console.log('callSrv PID:' + callsrv.pid);
            this.logger.warn(err);
            this.errMsg.onConnError('connection', err, callsrv);
        });
    }

    getCategories(){
        this.logger.log('CategoriesComponent.getCategories()');
        //le service
        let callSrv:HttpCallModel = this.call.getService(this.config.getSettings().api.category.categories, this);
        //le last call pid
        this.lastCallPid = callSrv.pid;
        //this.logger.log(callSrv);   
        this.httpCallSubscriber(callSrv);
    }

    private changeCheckedCatCount(){
        let counter:number = 0;
        let counterFiltered:number = 0;
        let str:string = '';
        //check ceux qui checker a true
        for(let k in this.arrAllCategories){
            if(this.arrAllCategories[k].checked){
                counter++;
            }
        }
        //la string
        str = this.translate.instant('categories.selection', {count:counter});
        //check ceux qui sont hidden par le filtre
        if(counter && this.filterBox.value != ''){
            for(let k in this.arrFilteredCategories){
                if(this.arrFilteredCategories[k].checked){
                    counterFiltered++;
                }
            }
            //si on a des filterred on affiche comme qui il y des hidden
            if(counter-counterFiltered){
                str += ' ' + this.translate.instant('categories.hidden', {count:(counter-counterFiltered)});    
            }    
        }
        //on change le count afficher
        this.userMessage(str);
    }

    ngDoCheck() {
        //on regarde combien sont checker sile data est loade
        if(this.isDataLoaded){
            this.changeCheckedCatCount();
        }
        
    }

    ngAfterViewInit() {
        //we have the lang so go fetch the categort listing
        //"'app.title' | translate:params"
        this.translate.get('generic.loading')
            .subscribe(str => {
                //on affiche le waiting
                this.userMessage(str);
                //on va chercher les categories
                this.getCategories();
                //3 fois pour tester 
                if(this.config.getSettings().api.test.async){
                    this.getCategories();
                    this.getCategories();
                }
                
                
            });
    }


}



//END SCRIPT