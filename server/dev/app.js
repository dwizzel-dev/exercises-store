webpackJsonp([1],{

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var ng2_translate_1 = __webpack_require__(47);
var logger_service_1 = __webpack_require__(22);
var core_2 = __webpack_require__(41);
var httpcall_module_1 = __webpack_require__(74);
var ErrMsgService = /** @class */ (function () {
    function ErrMsgService(logger, translate, config, call) {
        this.logger = logger;
        this.translate = translate;
        this.config = config;
        this.call = call;
    }
    ErrMsgService.prototype.onConnError = function (type, err, callsrv) {
        var _this = this;
        //show error in usrmsessage component
        callsrv.owner.userMessage(this.translate.instant('errorcode.connection.' + err.code), 'err');
        //recall untill max attempt reach
        if (callsrv.attempt < this.config.getSettings().api.retry.attempt) {
            //le reconnect retry msg
            setTimeout(function () {
                //msg
                callsrv.owner.userMessage(_this.translate.instant('errormsg.connection.retry', { count: _this.config.getSettings().api.retry.delay / 1000 }), 'ok');
            }, 1000);
            //le reconnect retry
            setTimeout(function () {
                //recall le service http en updatant le observer
                callsrv.obs = _this.call.callService(callsrv.srv, callsrv.pid, callsrv.search);
                callsrv.owner.httpCallSubscriber(callsrv);
                //console.log('+++ =callsrv.obs');
                //console.log(callsrv);
                //change le nbr attempt
                callsrv.attempt++;
            }, callsrv.owner.config.getSettings().api.retry.delay);
        }
        else {
            //nbr max attemps
            callsrv.owner.userMessage(this.translate.instant('errormsg.connection.maxattempt'), 'warn');
        }
    };
    ErrMsgService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(logger_service_1.Logger)),
        __metadata("design:paramtypes", [logger_service_1.Logger,
            ng2_translate_1.TranslateService,
            core_2.ConfigService,
            httpcall_module_1.HttpCallService])
    ], ErrMsgService);
    return ErrMsgService;
}());
exports.ErrMsgService = ErrMsgService;


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var core_2 = __webpack_require__(41);
var Logger = /** @class */ (function () {
    function Logger(config) {
        this.config = config;
        this.count = 0;
        //this.log('Logger.constructor()');
    }
    Logger.prototype.log = function (msg) {
        if (this.config.getSettings().logger) {
            if (typeof (msg) == 'string' || typeof (msg) == 'number') {
                console.log((this.count++) + ': ' + msg);
            }
            else {
                console.log((this.count++) + ': [');
                console.log(msg);
                console.log(']');
            }
        }
    };
    Logger.prototype.error = function (msg) {
        console.error('[' + (this.count++) + ']: ' + msg);
    };
    Logger.prototype.warn = function (msg) {
        if (this.config.getSettings().logger) {
            if (typeof (msg) == 'string' || typeof (msg) == 'number') {
                console.warn((this.count++) + ': ' + msg);
            }
            else {
                console.warn((this.count++) + ': [');
                console.warn(msg);
                console.warn(']');
            }
        }
    };
    Logger = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_2.ConfigService])
    ], Logger);
    return Logger;
}());
exports.Logger = Logger;


/***/ }),

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var platform_browser_dynamic_1 = __webpack_require__(174);
var app_module_1 = __webpack_require__(640);
if (process.env.ENV === 'production') {
    core_1.enableProdMode();
    console.log('-- PROD MODE --');
}
else {
    console.log('-- DEV MODE --');
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(99)))

/***/ }),

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * node_modules
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__(90);
var core_1 = __webpack_require__(41);
var http_loader_1 = __webpack_require__(214);
var core_2 = __webpack_require__(7);
var platform_browser_1 = __webpack_require__(66);
var ng2_translate_1 = __webpack_require__(47);
/**
 * local appz
 *
 */
var httpcall_module_1 = __webpack_require__(74);
var app_component_1 = __webpack_require__(641);
var categories_component_1 = __webpack_require__(644);
var historics_component_1 = __webpack_require__(648);
var populars_component_1 = __webpack_require__(650);
var usermsg_component_1 = __webpack_require__(652);
var searchbox_component_1 = __webpack_require__(656);
var filterbox_component_1 = __webpack_require__(659);
var checkbox_component_1 = __webpack_require__(663);
var checkbox_directive_1 = __webpack_require__(667);
var exercises_component_1 = __webpack_require__(668);
var logger_service_1 = __webpack_require__(22);
function translateFactory(http) {
    //console.log(__filename + ' function.translateFactory()');
    return new ng2_translate_1.TranslateStaticLoader(http, 'http://127.0.0.2/assets/i18n', '.json');
}
exports.translateFactory = translateFactory;
function configFactory(http) {
    //console.log(__filename + ' function.configFactory()');
    return new http_loader_1.ConfigHttpLoader(http, 'http://127.0.0.2/assets/config/config.json');
}
exports.configFactory = configFactory;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_2.NgModule({
            imports: [
                core_1.ConfigModule.forRoot({
                    provide: core_1.ConfigLoader,
                    useFactory: (configFactory),
                    deps: [http_1.Http]
                }),
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: (translateFactory),
                    deps: [http_1.Http]
                }),
                httpcall_module_1.HttpCallModule.forRoot({
                    provide: httpcall_module_1.HttpCallService,
                    deps: [http_1.Http, core_1.ConfigService]
                }),
                platform_browser_1.BrowserModule
            ],
            declarations: [
                app_component_1.AppComponent,
                categories_component_1.CategoriesComponent,
                exercises_component_1.ExercisesComponent,
                historics_component_1.HistoricsComponent,
                populars_component_1.PopularsComponent,
                usermsg_component_1.UserMsgComponent,
                checkbox_component_1.CheckBoxComponent,
                checkbox_directive_1.CheckBoxDirective,
                searchbox_component_1.SearchBoxComponent,
                filterbox_component_1.FilterBoxComponent
            ],
            providers: [
                logger_service_1.Logger
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//END SCRIPT 


/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var ng2_translate_1 = __webpack_require__(47);
var core_2 = __webpack_require__(41);
var logger_service_1 = __webpack_require__(22);
var AppComponent = /** @class */ (function () {
    function AppComponent(logger, translate, config) {
        //constructor
        //this.logger.log('AppComponent.constructor()');
        this.logger = logger;
        this.translate = translate;
        this.config = config;
        //version
        this.logger.log('AppComponent.version: ' + this.config.getSettings().version);
        //add langs
        this.translate.addLangs(['en', 'fr']);
        //this language will be used as a fallback 
        //when a translation isn't found in the current language
        //so it wil load it before the other ones
        this.translate.setDefaultLang('en');
        //the lang to use, if the lang isn't available, 
        //it will use the current loader to get them
        var browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        //this.translate.use('en');
        //param to show 
        this.params = {
            version: this.config.getSettings().version
        };
    }
    AppComponent.prototype.ngOnViewInit = function () {
    };
    AppComponent.prototype.ngOnInit = function () {
        //this.logger.log('AppComponent.ngOnInit()');
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'appz',
            template: __webpack_require__(642),
            styles: [
                __webpack_require__(643)
            ],
            providers: []
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger,
            ng2_translate_1.TranslateService,
            core_2.ConfigService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//END SCRIPT 


/***/ }),

/***/ 642:
/***/ (function(module, exports) {

module.exports = "<div class=\"title\">\r\n    <h1 [innerHTML]=\"'app.title' | translate:params\"></h1>\r\n</div>\r\n<div class=\"section\">    \r\n    <div>\r\n        <categories></categories>\r\n    </div>\r\n    <div>\r\n        <exercises></exercises>\r\n    </div> \r\n</div> ";

/***/ }),

/***/ 643:
/***/ (function(module, exports) {

module.exports = "div.title{\r\nborder-bottom: 1px solid #aaa;\r\nmargin-bottom: 20px;\r\n}\r\ndiv.section div{\r\nborder-bottom: 1px dotted #999;\r\nmargin-bottom: 20px;\r\npadding-bottom: 10px;\t\r\n}\r\ndiv.section div:last-child{\r\nborder-bottom: 0;\r\nmargin-bottom: 0;\r\npadding-bottom: 0;\t\r\n}"

/***/ }),

/***/ 644:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var ng2_translate_1 = __webpack_require__(47);
var core_2 = __webpack_require__(41);
var logger_service_1 = __webpack_require__(22);
var httpcall_module_1 = __webpack_require__(74);
var regexpermutation_service_1 = __webpack_require__(645);
var errmsg_service_1 = __webpack_require__(131);
var CategoriesComponent = /** @class */ (function () {
    function CategoriesComponent(logger, translate, config, call, regPermutation, errMsg) {
        var _this = this;
        this.logger = logger;
        this.translate = translate;
        this.config = config;
        this.call = call;
        this.regPermutation = regPermutation;
        this.errMsg = errMsg;
        this.isDataLoaded = false;
        this.lastCallPid = 0;
        //this.logger.log('CategoriesComponent.constructor()');
        //if we have a pre filter for de category listing filterbox
        this.filterBox = {
            value: '',
            disabled: true,
            placeholder: ''
        };
        //le placeholder translation
        this.translate.get('filterbox.placeholder').subscribe(function (str) {
            _this.filterBox.placeholder = str;
        });
        //user messgae
        this.userMessage();
        this.userMessageCountResult('0');
    }
    CategoriesComponent.prototype.onFilterboxInputValueChange = function (str) {
        this.logger.log('CategoriesComponent.onFilterboxInputValueChange(' + str + ')');
        this.filterCategoriesToDisplay(str);
    };
    CategoriesComponent.prototype.filterCategoriesToDisplay = function (str) {
        this.logger.log('CategoriesComponent.filterCategoriesToDisplay(' + str + ')');
        //sinon on filtre selon la string input value
        if (str != '') {
            var strRegex = this.regPermutation.wordPermutation(this.regPermutation.split(str));
            //console.log('[1]: "' + strRegex + '"');
            //push       
            this.arrFilteredCategories = this.arrAllCategories
                .filter(function (obj) {
                if (obj.label.match(new RegExp(this.reg, 'i')) != null) {
                    return obj;
                }
            }, { reg: strRegex });
            //console.log('count pass [1]:' + this.arrFilteredCategories.length); 
            //si vide on cherche juste si il y a 1 mot compose de au moins
            //2 carateres
            var arrStrWord = this.regPermutation.split(str);
            if (!this.arrFilteredCategories.length && arrStrWord.length == 1 && arrStrWord[0].length > 1) {
                strRegex = this.regPermutation.wordSpace(arrStrWord[0]);
                //console.log('[2]: "' + strRegex + '"');
                //push       
                this.arrFilteredCategories = this.arrAllCategories
                    .filter(function (obj) {
                    //console.log(obj.label.match(new RegExp(this.reg, 'i')));
                    if (obj.label.match(new RegExp(this.reg, 'i')) != null) {
                        return obj;
                    }
                }, { reg: strRegex });
                //console.log('count pass [2]:' + this.arrFilteredCategories.length);
            }
            //si toujours vide alors on enleve tout
            if (!this.arrFilteredCategories.length) {
                this.arrFilteredCategories = [];
                //console.log('count pass [3]:' + this.arrFilteredCategories.length);
            }
        }
        else {
            this.arrFilteredCategories = this.arrAllCategories;
        }
        //on affiche le count de result
        this.userMessageCountResult(this.arrFilteredCategories.length.toString());
    };
    CategoriesComponent.prototype.userMessage = function (str, style) {
        if (str === void 0) { str = ''; }
        if (style === void 0) { style = ''; }
        this.userMsg = {
            class: style,
            value: str
        };
    };
    CategoriesComponent.prototype.userMessageCountResult = function (str, style) {
        if (str === void 0) { str = ''; }
        if (style === void 0) { style = 'counter'; }
        this.userMsgCountResult = {
            class: style,
            value: str
        };
    };
    CategoriesComponent.prototype.httpCallSubscriber = function (callsrv) {
        var _this = this;
        callsrv.obs.subscribe(function (arr) {
            _this.logger.log('timer:' + (new Date().getTime() - callsrv.timestamp));
            _this.logger.log('pid:' + callsrv.pid);
            //this.logger.log(callsrv);
            //si pas le dernier alors ne pas traiter 
            //les autres qui peuvent etre asynchrone
            if (_this.lastCallPid == callsrv.pid) {
                _this.logger.log(arr);
                //le flag du data loaded
                _this.isDataLoaded = true;
                //le count des checked
                _this.changeCheckedCatCount();
                //sort alphabetic
                arr.sort(function (a, b) { return a.name.localeCompare(b.name); });
                //init object for ngLoop of checkbox component
                _this.arrFilteredCategories = [];
                _this.arrAllCategories = [];
                for (var i = 0; i < arr.length; i++) {
                    var obj = {
                        label: arr[i].name,
                        value: arr[i]._id,
                        checked: (arr[i].checked) ? true : false,
                        disabled: (arr[i].activated) ? false : true
                    };
                    _this.arrAllCategories.push(obj);
                }
                //un duplicate
                _this.arrFilteredCategories = _this.arrAllCategories;
                //on enable le filterbox input
                _this.filterBox.disabled = false;
                //on show le nombre de result
                _this.userMessageCountResult(_this.arrFilteredCategories.length.toString());
            }
            else {
                _this.logger.log('rejected pid:' + callsrv.pid);
            }
        }, function (err) {
            //console.warn(err);
            //console.log('callSrv PID:' + callsrv.pid);
            _this.logger.warn(err);
            _this.errMsg.onConnError('connection', err, callsrv);
        });
    };
    CategoriesComponent.prototype.getCategories = function () {
        this.logger.log('CategoriesComponent.getCategories()');
        //le service
        var callSrv = this.call.getService(this.config.getSettings().api.category.categories, this);
        //le last call pid
        this.lastCallPid = callSrv.pid;
        //this.logger.log(callSrv);   
        this.httpCallSubscriber(callSrv);
    };
    CategoriesComponent.prototype.changeCheckedCatCount = function () {
        var counter = 0;
        var counterFiltered = 0;
        var str = '';
        //check ceux qui checker a true
        for (var k in this.arrAllCategories) {
            if (this.arrAllCategories[k].checked) {
                counter++;
            }
        }
        //la string
        str = this.translate.instant('categories.selection', { count: counter });
        //check ceux qui sont hidden par le filtre
        if (counter && this.filterBox.value != '') {
            for (var k in this.arrFilteredCategories) {
                if (this.arrFilteredCategories[k].checked) {
                    counterFiltered++;
                }
            }
            //si on a des filterred on affiche comme qui il y des hidden
            if (counter - counterFiltered) {
                str += ' ' + this.translate.instant('categories.hidden', { count: (counter - counterFiltered) });
            }
        }
        //on change le count afficher
        this.userMessage(str);
    };
    CategoriesComponent.prototype.ngDoCheck = function () {
        //on regarde combien sont checker sile data est loade
        if (this.isDataLoaded) {
            this.changeCheckedCatCount();
        }
    };
    CategoriesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //we have the lang so go fetch the categort listing
        //"'app.title' | translate:params"
        this.translate.get('generic.loading')
            .subscribe(function (str) {
            //on affiche le waiting
            _this.userMessage(str);
            //on va chercher les categories
            _this.getCategories();
            //3 fois pour tester 
            if (_this.config.getSettings().api.test.async) {
                _this.getCategories();
                _this.getCategories();
            }
        });
    };
    CategoriesComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'categories',
            template: __webpack_require__(646),
            styles: [
                __webpack_require__(647)
            ],
            providers: [
                regexpermutation_service_1.RegexPermutationService,
                errmsg_service_1.ErrMsgService
            ]
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger,
            ng2_translate_1.TranslateService,
            core_2.ConfigService,
            httpcall_module_1.HttpCallService,
            regexpermutation_service_1.RegexPermutationService,
            errmsg_service_1.ErrMsgService])
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;
//END SCRIPT 


/***/ }),

/***/ 645:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var logger_service_1 = __webpack_require__(22);
var RegexPermutationService = /** @class */ (function () {
    function RegexPermutationService(logger) {
        //this.logger.log('RegexPermutation.constructor()');
        this.logger = logger;
    }
    RegexPermutationService.prototype.split = function (str) {
        this.logger.log('RegexPermutation.split(' + str + ')');
        var word = this.trimKeyword(str);
        //on garde juste les 3 premiers
        var arr = word.split(' ').slice(0, 3);
        return arr;
    };
    RegexPermutationService.prototype.wordPermutation = function (arrSplit) {
        this.logger.log('RegexPermutation.wordPermutation()');
        var arrRes = this.permutateArr(arrSplit);
        var tmp = [''];
        arrRes.forEach(function (item, index) {
            var str1 = '';
            var str2 = '';
            for (var o = 0; o < item.length; o++) {
                if (item.length == 1) {
                    str1 = '^[a-z0-9\\s]{0,}[\\s]{1}' + item[o] + '[a-z0-9\\s]{0,}';
                    str2 = '^' + item[o] + '[a-z0-9\\s]{0,}';
                }
                else if (o == 0) {
                    str1 = '^[a-z0-9\\s]{0,}[\\s]{1}' + item[o] + '[a-z0-9\\s]{0,}[\\s]{1}';
                    str2 = '^' + item[o] + '[a-z0-9\\s]{0,}[\\s]{1}';
                }
                else if (o == (item.length - 1)) {
                    str1 += item[o] + '[a-z0-9\\s]{0,}';
                    str2 += item[o] + '[a-z0-9\\s]{0,}';
                }
                else {
                    str1 += item[o] + '[a-z0-9\\s]{0,}[\\s]{1}';
                    str2 += item[o] + '[a-z0-9\\s]{0,}[\\s]{1}';
                }
            }
            //
            this.arr[0] += str2 + '|' + str1 + '|';
        }, { arr: tmp });
        //
        tmp[0] = tmp[0].substring(0, (tmp[0].length - 1));
        //
        return tmp[0];
    };
    RegexPermutationService.prototype.permutateArr = function (arrWord) {
        this.logger.log('RegexPermutation.permutateArr()');
        var results = [];
        function permute(arr, memo) {
            var cur, memo = memo || [];
            for (var i = 0; i < arr.length; i++) {
                cur = arr.splice(i, 1);
                if (arr.length === 0) {
                    results.push(memo.concat(cur));
                }
                permute(arr.slice(), memo.concat(cur));
                arr.splice(i, 0, cur[0]);
            }
            return results;
        }
        //
        return permute(arrWord, []);
    };
    RegexPermutationService.prototype.trimKeyword = function (str) {
        this.logger.log('RegexPermutation.trimKeyword()');
        str = str.toLowerCase();
        //str = this.regexEscape(str);
        str = str.replace(/[^a-zA-Z0-9\sÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/gi, ' ');
        str = str.replace(/[\s]+/gi, ' ');
        str = str.trim();
        //to array
        return str;
    };
    RegexPermutationService.prototype.regexEscape = function (str) {
        this.logger.log('RegexPermutation.regexEscape()');
        return str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    };
    RegexPermutationService.prototype.wordSpace = function (word) {
        this.logger.log('RegexPermutation.wordSpace()');
        //arr des mots a retenir
        var str1 = '';
        var str2 = '';
        var strLeft = '';
        var strRight = '';
        var strRegex = '';
        //
        //le max de chars a 5
        word = word.substring(0, 5);
        //on creer un couple de mot de remplacement
        for (var i = 0; i < (word.length - 1); i++) {
            strLeft = '';
            for (var j = 0; j < word.length - (word.length - (i + 1)); j++) {
                strLeft += word.charAt(j);
            }
            strRight = '';
            for (var j = (i + 1); j < word.length; j++) {
                strRight += word.charAt(j);
            }
            str1 += '^' + strLeft + '[a-z0-9]{1,2}' + strRight + '[a-z0-9\\s]{0,}|';
            str2 += '^[a-z0-9\\s]{0,}[\\s]{1}' + strLeft + '[a-z0-9]{1,2}' + strRight + '[a-z0-9\\s]{0,}|';
        }
        //strip
        if (str1 != '' && str2 != '') {
            str1 = str1.substring(0, (str1.length - 1));
            str2 = str2.substring(0, (str2.length - 1));
            strRegex = str1 + '|' + str2;
        }
        //le retour
        return strRegex;
    };
    RegexPermutationService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(logger_service_1.Logger)),
        __metadata("design:paramtypes", [logger_service_1.Logger])
    ], RegexPermutationService);
    return RegexPermutationService;
}());
exports.RegexPermutationService = RegexPermutationService;
//END SCRIPT 


/***/ }),

/***/ 646:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div>\r\n        <h3>{{ 'categories.title' | translate }}</h3>\r\n    </div>\r\n    <div>\r\n        <filterbox \r\n            [filterboxParams]=\"filterBox\" \r\n            (onChangeInputValue)=\"onFilterboxInputValueChange($event)\"  \r\n        ></filterbox>\r\n    </div>\r\n</div>\r\n<div> \r\n    <usermsg \r\n        [usermsgParams]=\"userMsg\"\r\n    ></usermsg>\r\n     <usermsg \r\n        [usermsgParams]=\"userMsgCountResult\"\r\n    ></usermsg>\r\n</div>        \r\n<div class=\"listing-box\"> \r\n    <div class=\"listing\">\r\n        <div *ngFor=\"let cat of arrFilteredCategories\">\r\n            <checkbox \r\n                [checkboxParams]=\"cat\"\r\n            ></checkbox>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 647:
/***/ (function(module, exports) {

module.exports = "div.listing-box{\r\npadding:10px;\r\nborder: 1px solid rgba(0,0,0,.15);\r\nborder-radius: 3px;\r\nmargin-bottom: 20px;\r\nclear:both;\r\n}\r\ndiv.listing-box > div.listing{\r\nheight: 130px;\r\noverflow-y: auto;\r\n}\r\n"

/***/ }),

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var ng2_translate_1 = __webpack_require__(47);
var core_2 = __webpack_require__(41);
var logger_service_1 = __webpack_require__(22);
var httpcall_module_1 = __webpack_require__(74);
var errmsg_service_1 = __webpack_require__(131);
var HistoricsComponent = /** @class */ (function () {
    function HistoricsComponent(logger, translate, config, call, errMsg) {
        this.logger = logger;
        this.translate = translate;
        this.config = config;
        this.call = call;
        this.errMsg = errMsg;
        this.arrSearch = [];
        this.lastCallPid = 0;
        //user messgae
        this.userMessage();
    }
    HistoricsComponent.prototype.userMessage = function (str, style) {
        if (str === void 0) { str = ''; }
        if (style === void 0) { style = ''; }
        this.userMsg = {
            class: style,
            value: str
        };
    };
    HistoricsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //this.logger.log('HistoricsComponent.ngAfterViewInit()'); 
        this.translate.get('generic.loading').subscribe(function (str) {
            _this.userMessage(str);
            _this.getHistory();
        });
    };
    HistoricsComponent.prototype.httpCallSubscriber = function (callsrv) {
        var _this = this;
        callsrv.obs.subscribe(function (arr) {
            _this.logger.log('timer:' + (new Date().getTime() - callsrv.timestamp));
            _this.logger.log('pid:' + callsrv.pid);
            //this.logger.log(callsrv);
            //si pas le dernier alors ne pas traiter 
            //les autres qui peuvent etre asynchrone
            if (_this.lastCallPid == callsrv.pid) {
                _this.logger.log(arr);
                _this.userMessage();
                _this.arrSearch = arr;
            }
            else {
                _this.logger.log('rejected pid:' + callsrv.pid);
            }
        }, function (err) {
            //console.warn(err);
            //console.log('callSrv PID:' + callsrv.pid);
            _this.logger.warn(err);
            _this.errMsg.onConnError('connection', err, callsrv);
        });
    };
    HistoricsComponent.prototype.getHistory = function () {
        this.logger.log('HistoricsComponent.getHistory()');
        //le service
        //to generate a bad service call
        //let callSrv:HttpCallModel = this.call.getService(this.config.getSettings().api.test.badservice, this);
        var callSrv = this.call.getService(this.config.getSettings().api.search.history, this);
        //le last call pid
        this.lastCallPid = callSrv.pid;
        //this.logger.log(callSrv);    
        this.httpCallSubscriber(callSrv);
    };
    HistoricsComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'historics',
            template: __webpack_require__(649),
            providers: [
                errmsg_service_1.ErrMsgService
            ]
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger,
            ng2_translate_1.TranslateService,
            core_2.ConfigService,
            httpcall_module_1.HttpCallService,
            errmsg_service_1.ErrMsgService])
    ], HistoricsComponent);
    return HistoricsComponent;
}());
exports.HistoricsComponent = HistoricsComponent;
//END SCRIPT 


/***/ }),

/***/ 649:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <h5>{{ 'historics.title' | translate }}</h5>\r\n</div>\r\n<div>\r\n    <usermsg \r\n        [usermsgParams]=\"userMsg\"\r\n    ></usermsg>\r\n</div>    \r\n<div>\r\n    <ul>\r\n        <li *ngFor=\"let kw of arrSearch\">\r\n            {{kw.name}} ({{kw.count}})\r\n        </li>        \r\n    </ul>\r\n</div> ";

/***/ }),

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var ng2_translate_1 = __webpack_require__(47);
var core_2 = __webpack_require__(41);
var logger_service_1 = __webpack_require__(22);
var httpcall_module_1 = __webpack_require__(74);
var errmsg_service_1 = __webpack_require__(131);
var PopularsComponent = /** @class */ (function () {
    function PopularsComponent(logger, translate, config, call, errMsg) {
        this.logger = logger;
        this.translate = translate;
        this.config = config;
        this.call = call;
        this.errMsg = errMsg;
        this.arrSearch = [];
        this.lastCallPid = 0;
        //user messgae
        this.userMessage();
    }
    PopularsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.translate.get('generic.loading').subscribe(function (str) {
            _this.userMessage(str);
            ;
            _this.getPopular();
        });
    };
    PopularsComponent.prototype.userMessage = function (str, style) {
        if (str === void 0) { str = ''; }
        if (style === void 0) { style = ''; }
        this.userMsg = {
            class: style,
            value: str
        };
    };
    PopularsComponent.prototype.httpCallSubscriber = function (callsrv) {
        var _this = this;
        callsrv.obs.subscribe(function (arr) {
            _this.logger.log('timer:' + (new Date().getTime() - callsrv.timestamp));
            _this.logger.log('pid:' + callsrv.pid);
            //this.logger.log(callsrv);
            //si pas le dernier alors ne pas traiter 
            //les autres qui peuvent etre asynchrone
            if (_this.lastCallPid == callsrv.pid) {
                _this.logger.log(arr);
                _this.userMessage();
                _this.arrSearch = arr;
            }
            else {
                _this.logger.log('rejected pid:' + callsrv.pid);
            }
        }, function (err) {
            //console.warn(err);
            //console.log('callSrv PID:' + callsrv.pid);
            _this.logger.warn(err);
            _this.errMsg.onConnError('connection', err, callsrv);
        });
    };
    PopularsComponent.prototype.getPopular = function () {
        this.logger.log('PopularsComponent.getPopular()');
        //le service
        //to generate json error test
        //let callSrv:HttpCallModel = this.call.getService(this.config.getSettings().api.test.badjson, this);
        var callSrv = this.call.getService(this.config.getSettings().api.search.popular, this);
        this.lastCallPid = callSrv.pid;
        //le last call pid
        //this.logger.log(callSrv);    
        this.httpCallSubscriber(callSrv);
    };
    PopularsComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'populars',
            template: __webpack_require__(651),
            providers: [
                errmsg_service_1.ErrMsgService
            ]
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger,
            ng2_translate_1.TranslateService,
            core_2.ConfigService,
            httpcall_module_1.HttpCallService,
            errmsg_service_1.ErrMsgService])
    ], PopularsComponent);
    return PopularsComponent;
}());
exports.PopularsComponent = PopularsComponent;
//END SCRIPT 


/***/ }),

/***/ 651:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <h5>{{ 'populars.title' | translate }}</h5>\r\n</div>\r\n<div>\r\n    <usermsg \r\n        [usermsgParams]=\"userMsg\"\r\n    ></usermsg>\r\n</div>    \r\n<div>\r\n    <ul>\r\n        <li *ngFor=\"let kw of arrSearch\">\r\n            {{kw.name}} ({{kw.count}})\r\n        </li>        \r\n    </ul>\r\n</div>";

/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var logger_service_1 = __webpack_require__(22);
var usermsg_model_1 = __webpack_require__(653);
var UserMsgComponent = /** @class */ (function () {
    function UserMsgComponent(logger) {
        this.logger = logger;
        //this.logger.log('UserMsgComponent.constructor()'); 
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", usermsg_model_1.UserMsgModel)
    ], UserMsgComponent.prototype, "usermsgParams", void 0);
    UserMsgComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'usermsg',
            template: __webpack_require__(654),
            styles: [
                __webpack_require__(655)
            ]
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger])
    ], UserMsgComponent);
    return UserMsgComponent;
}());
exports.UserMsgComponent = UserMsgComponent;
//END SCRIPT 


/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserMsgModel = /** @class */ (function () {
    function UserMsgModel() {
    }
    return UserMsgModel;
}());
exports.UserMsgModel = UserMsgModel;


/***/ }),

/***/ 654:
/***/ (function(module, exports) {

module.exports = "<div [class]=\"usermsgParams.class\">\r\n    <span [innerHTML]=\"usermsgParams.value\"></span>\r\n</div>    ";

/***/ }),

/***/ 655:
/***/ (function(module, exports) {

module.exports = "div{\r\ncolor: #5bc0de;\r\nmargin-bottom: 10px;\r\nfont-size: small;\r\npadding:0 5px;\r\nborder-radius: 3px;\r\nfloat:left;\r\n}\r\ndiv.err{\r\nbackground-color: rgba(201, 48, 44, 0.2);\r\npadding: 5px 10px;\r\ncolor: #c9302c;\r\nfont-size: small;\r\nborder: 1px solid #c9302c;\r\n}\r\ndiv.ok{\r\nbackground-color: rgba(92, 184, 92, 0.20);\r\npadding: 5px 10px;\r\ncolor: #3c763d;\r\nfont-size: small;\r\nborder: 1px solid #3c763d;\r\n}\r\ndiv.warn{\r\nbackground-color: rgba(236, 151, 31, 0.2);\r\npadding: 5px 10px;\r\ncolor: #ec971f;\r\nfont-size: small;\r\nborder: 1px solid #ec971f;\r\n}\r\ndiv.counter{\r\npadding: 0px 4px;\r\ncolor: #ec971f;\r\nfont-size: small;\r\nborder: 1px solid #ec971f;\r\nfloat:right;\r\n}\r\n"

/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var logger_service_1 = __webpack_require__(22);
var SearchBoxComponent = /** @class */ (function () {
    function SearchBoxComponent(logger) {
        this.logger = logger;
        //this.logger.log('SearchBoxComponent.constructor()'); 
    }
    SearchBoxComponent.prototype.ngOnInit = function () {
        //this.logger.log('SearchBoxComponent.ngOnInit()'); 
    };
    SearchBoxComponent.prototype.ngAfterViewInit = function () {
        //this.logger.log('SearchBoxComponent.ngAfterViewInit()'); 
    };
    SearchBoxComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'searchbox',
            template: __webpack_require__(657),
            styles: [
                __webpack_require__(658)
            ]
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger])
    ], SearchBoxComponent);
    return SearchBoxComponent;
}());
exports.SearchBoxComponent = SearchBoxComponent;
//END SCRIPT 


/***/ }),

/***/ 657:
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group\">\r\n    <input class=\"form-control\" type=\"text\" placeholder=\"{{ 'searchbox.placeholder' | translate }}\" />\r\n</div>";

/***/ }),

/***/ 658:
/***/ (function(module, exports) {

module.exports = "input[type=\"text\"]:focus{\r\ncolor:#5cb3fd;\r\n}\r\ninput[type=\"text\"]{\r\nmargin: 10px 0;\r\ncolor:rgba(91, 192, 222, 0.5);\r\n}\r\n/* placeholder */\r\ninput[type=\"text\"]::-webkit-input-placeholder { /* Chrome/Opera/Safari */\r\n  color: #ddd;\r\n}\r\ninput[type=\"text\"]::-moz-placeholder { /* Firefox 19+ */\r\n  color: #ddd;\r\n}\r\ninput[type=\"text\"]:-ms-input-placeholder { /* IE 10+ */\r\n  color: #ddd;\r\n}\r\ninput[type=\"text\"]:-moz-placeholder { /* Firefox 18- */\r\n  color: #ddd;\r\n}\r\n"

/***/ }),

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var logger_service_1 = __webpack_require__(22);
var filterbox_model_1 = __webpack_require__(660);
var FilterBoxComponent = /** @class */ (function () {
    function FilterBoxComponent(logger) {
        this.logger = logger;
        this.onChangeInputValue = new core_1.EventEmitter();
        //this.logger.log('FilterBoxComponent.constructor()');
    }
    FilterBoxComponent.prototype.onKey = function (value) {
        this.logger.log('FilterBoxComponent.onKey(' + value + ')');
        //pour avoir une cocordance avec le parent qui initie le filterbox
        this.filterboxParams.value = value;
        //on emet un event a ceux qui ecoute
        this.onChangeInputValue.emit(value);
    };
    FilterBoxComponent.prototype.ngOnInit = function () {
        //this.logger.log('FilterBoxComponent.ngOnInit()'); 
    };
    FilterBoxComponent.prototype.ngAfterViewInit = function () {
        //this.logger.log('FilterBoxComponent.ngAfterViewInit()'); 
    };
    FilterBoxComponent.prototype.ngOnChanges = function (changes) {
        //this.logger.log('FilterBoxComponent.ngOnChanges()'); 
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", filterbox_model_1.FilterBoxModel)
    ], FilterBoxComponent.prototype, "filterboxParams", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FilterBoxComponent.prototype, "onChangeInputValue", void 0);
    FilterBoxComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'filterbox',
            template: __webpack_require__(661),
            styles: [
                __webpack_require__(662)
            ]
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger])
    ], FilterBoxComponent);
    return FilterBoxComponent;
}());
exports.FilterBoxComponent = FilterBoxComponent;
//END SCRIPT 


/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FilterBoxModel = /** @class */ (function () {
    function FilterBoxModel() {
    }
    return FilterBoxModel;
}());
exports.FilterBoxModel = FilterBoxModel;


/***/ }),

/***/ 661:
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group\">\r\n    <input \r\n        #input \r\n        class=\"form-control form-control-sm\" \r\n        type=\"text\" \r\n        [placeholder]=\"filterboxParams.placeholder\" \r\n        [value]=\"filterboxParams.value\" \r\n        [disabled]=\"filterboxParams.disabled\" \r\n        (keyup)=\"onKey(input.value)\" \r\n    />\r\n</div>";

/***/ }),

/***/ 662:
/***/ (function(module, exports) {

module.exports = "input[type=\"text\"]:focus{\r\ncolor:#5cb3fd;\r\ntext-transform: uppercase;\r\n}\r\ninput[type=\"text\"]{\r\nmargin: 10px 0;\r\ncolor:rgba(91, 192, 222, 0.5);\r\n}\r\n/*\r\ninput[type=\"text\"]{\r\nheight: 30px;\r\npadding: 5px 10px;\r\nfont-size: 12px;\r\nline-height: 1.5;\r\nborder-radius: 3px;\r\n}\r\n*/\r\n/* placeholder */\r\ninput[type=\"text\"]::-webkit-input-placeholder { /* Chrome/Opera/Safari */\r\n  color: #ddd;\r\n}\r\ninput[type=\"text\"]::-moz-placeholder { /* Firefox 19+ */\r\n  color: #ddd;\r\n}\r\ninput[type=\"text\"]:-ms-input-placeholder { /* IE 10+ */\r\n  color: #ddd;\r\n}\r\ninput[type=\"text\"]:-moz-placeholder { /* Firefox 18- */\r\n  color: #ddd;\r\n}"

/***/ }),

/***/ 663:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var logger_service_1 = __webpack_require__(22);
var checkbox_model_1 = __webpack_require__(664);
var CheckBoxComponent = /** @class */ (function () {
    function CheckBoxComponent(logger) {
        this.logger = logger;
        //this.logger.log('CheckBoxComponent.constructor()');   
    }
    CheckBoxComponent.prototype.onCheckboxStateChange = function (state) {
        this.logger.log('CheckBoxComponent.onCheckboxStateChange(' + state + ')');
        this.checkboxParams.checked = state;
    };
    CheckBoxComponent.prototype.ngOnInit = function () {
        //this.logger.log('CheckBoxComponent.ngOnInit()'); 
    };
    CheckBoxComponent.prototype.ngAfterViewInit = function () {
        //this.logger.log('CheckBoxComponent.ngAfterViewInit()'); 
    };
    CheckBoxComponent.prototype.ngOnChanges = function () {
        //this.logger.log('CheckBoxComponent.ngOnChanges()'); 
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", checkbox_model_1.CheckBoxModel)
    ], CheckBoxComponent.prototype, "checkboxParams", void 0);
    CheckBoxComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'checkbox',
            template: __webpack_require__(665),
            styles: [
                __webpack_require__(666)
            ],
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger])
    ], CheckBoxComponent);
    return CheckBoxComponent;
}());
exports.CheckBoxComponent = CheckBoxComponent;
//END SCRIPT 


/***/ }),

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//models of arrCategories
var CheckBoxModel = /** @class */ (function () {
    function CheckBoxModel() {
    }
    return CheckBoxModel;
}());
exports.CheckBoxModel = CheckBoxModel;


/***/ }),

/***/ 665:
/***/ (function(module, exports) {

module.exports = "<div class=\"form-check\">\r\n    <label class=\"form-check-label\">\r\n        <input \r\n        class=\"form-check-input\" \r\n        type=\"checkbox\" \r\n        [value]=\"checkboxParams.value\" \r\n        [checked]=\"checkboxParams.checked\" \r\n        [disabled]=\"checkboxParams.disabled\" \r\n        (onChangeCheckedState)=\"onCheckboxStateChange($event)\" \r\n        checkbox\r\n        >\r\n        <div class=\"text\" [innerHTML]=\"checkboxParams.label\"></div> \r\n    </label>\r\n</div>";

/***/ }),

/***/ 666:
/***/ (function(module, exports) {

module.exports = "/* \r\nparent label element of the checkbox element \r\n*/\r\nlabel.label-checked{\r\ncolor:#31b0d5;\r\n}\r\nlabel.label-disabled{\r\nopacity:0.5;\r\n}\r\n/*\r\nlabel text adjustment\r\n*/\r\nlabel .text{\r\n/*margin-top: -2px;*/\r\nfont-size: smaller;\r\n}\r\n"

/***/ }),

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var logger_service_1 = __webpack_require__(22);
var CheckBoxDirective = /** @class */ (function () {
    function CheckBoxDirective(el, rend, logger) {
        this.el = el;
        this.rend = rend;
        this.logger = logger;
        //le state emitter
        this.onChangeCheckedState = new core_1.EventEmitter();
        //label parent style of the checkbox to apply
        this.checkedStyle = 'label-checked';
        this.disabledStyle = 'label-disabled';
        //this.logger.log("CheckBoxDirective.constructor()");  
        this.labelElement = this.el.nativeElement.parentElement;
    }
    CheckBoxDirective.prototype.ngOnInit = function () {
        //this.logger.log('CheckBoxDirective.ngOnInit()');
        this.checked = this.el.nativeElement.checked;
    };
    CheckBoxDirective.prototype.ngAfterViewInit = function () {
        //this.logger.log('CheckBoxDirective.ngAfterViewInit()'); 
        this.checked = this.el.nativeElement.checked;
        this.disabled = this.el.nativeElement.disabled;
        this.changeStyle();
    };
    CheckBoxDirective.prototype.changeStyle = function () {
        this.rend.setElementClass(this.labelElement, this.checkedStyle, this.checked);
        this.rend.setElementClass(this.labelElement, this.disabledStyle, this.disabled);
    };
    CheckBoxDirective.prototype.onchange = function (state) {
        //this.logger.log("CheckBoxDirective.@HostListener('change') onchange(" + state + ")");
        this.checked = state;
        this.onChangeCheckedState.emit(this.checked);
        this.changeStyle();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CheckBoxDirective.prototype, "onChangeCheckedState", void 0);
    __decorate([
        core_1.HostListener('change', ['$event.target.checked']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], CheckBoxDirective.prototype, "onchange", null);
    CheckBoxDirective = __decorate([
        core_1.Directive({
            selector: '[checkbox]',
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer,
            logger_service_1.Logger])
    ], CheckBoxDirective);
    return CheckBoxDirective;
}());
exports.CheckBoxDirective = CheckBoxDirective;
//END SCRIPT 


/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var ng2_translate_1 = __webpack_require__(47);
var logger_service_1 = __webpack_require__(22);
var ExercisesComponent = /** @class */ (function () {
    function ExercisesComponent(logger, translate) {
        this.logger = logger;
        this.translate = translate;
        //this.logger.log('HistoricsComponent.constructor()');
    }
    ExercisesComponent.prototype.ngOnInit = function () {
        //this.logger.log('HistoricsComponent.ngOnInit()');
    };
    ExercisesComponent.prototype.ngAfterViewInit = function () {
        //this.logger.log('HistoricsComponent.ngAfterViewInit()'); 
    };
    ExercisesComponent = __decorate([
        core_1.Component({
            moduleId: module.i.toString(),
            selector: 'exercises',
            template: __webpack_require__(669),
            providers: []
        }),
        __metadata("design:paramtypes", [logger_service_1.Logger,
            ng2_translate_1.TranslateService])
    ], ExercisesComponent);
    return ExercisesComponent;
}());
exports.ExercisesComponent = ExercisesComponent;
//END SCRIPT 


/***/ }),

/***/ 669:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col\">\r\n        <h3 [innerHTML]=\"'exercises.title' | translate:params\"></h3>\r\n    </div>        \r\n</div> \r\n<div class=\"row\">\r\n    <div class=\"col\">\r\n        <searchbox></searchbox>\r\n    </div>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"col\">\r\n        <historics></historics>\r\n    </div>\r\n    <div class=\"col\">\r\n        <populars></populars>\r\n    </div>\r\n</div> ";

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(7);
var http_1 = __webpack_require__(90);
var Observable_1 = __webpack_require__(0);
var core_2 = __webpack_require__(41);
__webpack_require__(198);
__webpack_require__(205);
__webpack_require__(194);
__webpack_require__(192);
var HttpCallModule = /** @class */ (function () {
    function HttpCallModule() {
    }
    HttpCallModule_1 = HttpCallModule;
    HttpCallModule.forRoot = function (obj) {
        return {
            ngModule: HttpCallModule_1,
            providers: [HttpCallService]
        };
    };
    HttpCallModule = HttpCallModule_1 = __decorate([
        core_1.NgModule({})
    ], HttpCallModule);
    return HttpCallModule;
    var HttpCallModule_1;
}());
exports.HttpCallModule = HttpCallModule;
var HttpCallService = /** @class */ (function () {
    function HttpCallService(http, config) {
        this.http = http;
        this.config = config;
        //for testing calls
        this.delay = 0;
        this.async = false;
        this.substract = 0;
        //console.warn('HttpCallService.constructor()'); 
        //local
        this.processId = 100;
        //by config
        this.host = this.config.getSettings().api.http.host;
        this.port = this.config.getSettings().api.http.port;
        this.retryWhen = this.config.getSettings().api.http.retry;
        this.timeout = this.config.getSettings().api.http.timeout;
        //by config for test
        this.async = this.config.getSettings().api.test.async;
        this.substract = this.config.getSettings().api.test.substract;
        //si async alors on rajoute le delai
        if (this.async) {
            this.delay = this.config.getSettings().api.test.delay;
        }
    }
    HttpCallService.prototype.getProcessId = function () {
        return this.processId++;
    };
    HttpCallService.prototype.callService = function (service, pid, search) {
        //console.warn('++= callService');
        //console.log(service);
        //console.log(pid);
        //console.log(search);
        //test asynchrone
        if (this.async) {
            this.delay -= this.substract;
        }
        var url = this.host + ':' + this.port + service;
        console.log(url);
        var req = new http_1.Request(new http_1.RequestOptions({
            url: url,
            method: http_1.RequestMethod.Get,
            search: search,
            headers: this.createAuthHeaders(),
            body: null
        }));
        return this.http
            .request(req)
            .retryWhen(function (error) {
            //no retry let the caller handle the error                
            throw { code: 'ERR404' };
            //with retry
            //return error.delay(this.retryWhen);
        })
            .timeoutWith(this.timeout, Observable_1.Observable.throw({ code: 'ERR001' }))
            .map(function (res) {
            if (res.status != 200) {
                throw { code: 'ERR' + res.status };
            }
            else {
                try {
                    return res.json();
                }
                catch (e) {
                    throw { code: 'ERR900' };
                }
            }
        })
            .catch(function (error) {
            return Observable_1.Observable.throw(error);
        })
            .delay(this.delay);
    };
    HttpCallService.prototype.getService = function (service, owner, search) {
        if (search === void 0) { search = {}; }
        var pid = this.getProcessId();
        var callSrv = {
            pid: pid,
            srv: service,
            obs: this.callService(service, pid, search),
            timestamp: new Date().getTime(),
            search: search,
            attempt: 0,
            owner: owner
        };
        return callSrv;
    };
    HttpCallService.prototype.createAuthHeaders = function () {
        var headers = new http_1.Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        /*
        if(this.userService.user) {
            headers.set('Authorization', this.identityService.user.token);
        }
        */
        return headers;
    };
    HttpCallService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            core_2.ConfigService])
    ], HttpCallService);
    return HttpCallService;
}());
exports.HttpCallService = HttpCallService;
//END SCRIPT 


/***/ })

},[639]);
//# sourceMappingURL=app.js.map