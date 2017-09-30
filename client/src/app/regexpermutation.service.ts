

import {Injectable,
        Inject
    } from '@angular/core';
import {Logger 
    } from './logger.service'


@Injectable()
export class RegexPermutationService{

    constructor(@Inject(Logger) private logger:Logger){

        //this.logger.log('RegexPermutation.constructor()');

    }

    public split(str:string):string[]{
        this.logger.log('RegexPermutation.split(' + str + ')');

        var word = this.trimKeyword(str);
        //on garde juste les 3 premiers
		var arr = word.split(' ').slice(0, 3);
        
        return arr;
    }

    public wordPermutation(arrSplit:string[]):string{

        this.logger.log('RegexPermutation.wordPermutation()');

        var arrRes = this.permutateArr(arrSplit);	
		var tmp = [''];
        arrRes.forEach(function(item:any, index){
            var str1 = '';
            var str2 = '';
            for(var o=0;o<item.length;o++){
                if(item.length == 1){ //il est seul
                    str1 = '^[a-z0-9\\s]{0,}[\\s]{1}' + item[o] + '[a-z0-9\\s]{0,}'; 	str2 = '^' + item[o] + '[a-z0-9\\s]{0,}';	
                }else if(o == 0){ //check si le premier et pas tut seul
                    str1 = '^[a-z0-9\\s]{0,}[\\s]{1}' + item[o] + '[a-z0-9\\s]{0,}[\\s]{1}'; 					 
                    str2 = '^' + item[o] + '[a-z0-9\\s]{0,}[\\s]{1}';	
                }else if(o == (item.length - 1)){ //check si le dernier et pas tut seul
                    str1 += item[o] + '[a-z0-9\\s]{0,}';
                    str2 += item[o] + '[a-z0-9\\s]{0,}';
                }else{ //les autres dans le milieu et pas tut seul
                    str1 += item[o] + '[a-z0-9\\s]{0,}[\\s]{1}';
                    str2 += item[o] + '[a-z0-9\\s]{0,}[\\s]{1}';		
                    }
                }
            //
            this.arr[0] += str2 + '|' + str1 + '|';
            }, {arr: tmp});
        //
        tmp[0] = tmp[0].substring(0, (tmp[0].length - 1));
        //
        return tmp[0];	


    }


    public permutateArr(arrWord:string[]):string[]{

        this.logger.log('RegexPermutation.permutateArr()');

		var results:string[] = [];
		function permute(arr:string[], memo:any){
			var cur, memo = memo || [];
			for(var i = 0; i < arr.length; i++){
				cur = arr.splice(i, 1);
				if(arr.length === 0){
					results.push(memo.concat(cur));
				}
				permute(arr.slice(), memo.concat(cur));
				arr.splice(i, 0, cur[0]);
			}
			return results;
		}	
		//
		return permute(arrWord, []);
    }



    public trimKeyword(str:string):string{

        this.logger.log('RegexPermutation.trimKeyword()');

        str = str.toLowerCase();
        //str = this.regexEscape(str);
        str = str.replace(/[^a-zA-Z0-9\sÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/gi, ' ');
		str = str.replace(/[\s]+/gi, ' ');	
		str = str.trim();
        //to array
		return str;
	}

    public regexEscape(str:string):string{

        this.logger.log('RegexPermutation.regexEscape()');

        return str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }



    public wordSpace(word:string):string{

        this.logger.log('RegexPermutation.wordSpace()');

		//arr des mots a retenir
		var str1 = '';
		var str2 = '';
		var strLeft = '';
		var strRight = '';
		var strRegex = '';
		//
		//le max de chars a 5
		word = word.substring(0,5);
		//on creer un couple de mot de remplacement
		for(var i=0;i<(word.length-1);i++){
			strLeft = '';
			for(var j=0;j<word.length-(word.length-(i+1));j++){
				strLeft += word.charAt(j);
			}
			strRight = '';
			for(var j=(i+1);j<word.length;j++){
				strRight += word.charAt(j);
			}
			str1 += '^' + strLeft + '[a-z0-9]{1,2}' + strRight + '[a-z0-9\\s]{0,}|';
			str2 += '^[a-z0-9\\s]{0,}[\\s]{1}' + strLeft + '[a-z0-9]{1,2}' + strRight + '[a-z0-9\\s]{0,}|';
		}
		//strip
		if(str1 != '' && str2 != '' ){
			str1 = str1.substring(0, (str1.length - 1));
			str2 = str2.substring(0, (str2.length - 1));
			strRegex = str1 + '|' + str2;
		}
		//le retour
		return strRegex;	
	}

}


//END SCRIPT