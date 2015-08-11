$(function(){
	// function devideArrayAfterString (arr, string){
	// 	var array = arr.slice(0); //コピーを作る。
	// 	for(var i = 0; i < array.length; i++){
 // 			var value = array[i];
 // 			if(value.indexOf(string) !== -1){
 // 				array.splice(i, 1, value.substring(0, value.indexOf(string) + string.length), value.substring(value.indexOf(string) + string.length));
 // 			}
 // 		}
 // 		return array;
	// }
	// function devideArrayBeforeString (arr, string){
	// 	var array = arr.slice(0);
	// 	for(var i = 0; i < array.length; i++){
 // 			var value = array[i];
 // 			if(value.indexOf(string) !== -1){
 // 				array.splice(i, 1, value.substring(0, value.indexOf(string)), value.substring(value.indexOf(string)));
 // 				i++;
 // 			}
 // 		}
 // 		return array;
	// }
	// 
	function devideStringByTagname (arr, tagName){
		var bool = false;
		var array = arr.slice(0);
 		for(var i = 0; i < array.length; i++){
 			var value = array[i];
 			if(bool){
 				if(value.indexOf("</" + tagName + ">") !== -1){
 					array.splice(i, 1, value.substring(0, value.indexOf("</" + tagName + ">") + 3 + tagName.length), value.substring(value.indexOf("</" + tagName + ">") + 3 + tagName.length));
 					bool = false;
 				}
 			}else{
 				if(value.indexOf("<" + tagName + ">") !== -1){
 					array.splice(i, 1, value.substring(0, value.indexOf("<" + tagName + ">")), value.substring(value.indexOf("<" + tagName + ">")));
 					bool = true;
 					console.log(value.substring(0, value.indexOf("<" + tagName + ">")));
 					console.log(value.substring(value.indexOf("<" + tagName + ">")));
 				}
 			}
 		}
 		return array;
	}
	function findTagAndReturnTagstring(htmlString, tagName){
 	var arr = htmlString.split("\n");
 	// console.log(array);
 	var array = devideStringByTagname(arr, "body")


 	console.log(array);
 	/*
 	console.log(array.join("_"));
 	var bool = false;
 	// var indexArray = [];
 	// var returnArray = [];
 	var arrayOfTag = array.filter(function(value, index, arr){
 		if(bool){
 			if(value.indexOf("</" + tagName + ">") !== -1){
 				// arr.splice(index, 1, value.substring(0, value.indexOf("</" + tagName + ">") + 3 + tagName.length), value.substring(value.indexOf("</" + tagName + ">") + 3 + tagName.length));
 				bool = false;
 			}
 			return true;
 		}else{
 			if(value.indexOf("<" + tagName + ">") !== -1){
 				// arr.splice(index, 1, value.substring(0, value.indexOf("<" + tagName + ">"), value.substring(value.indexOf("<" + tagName + ">") + 2 + tagName.length)));
 				bool = true;
 				return false;
 			}
 			return false;
 		}
 	});
 	console.log(array.join("|"));r
 	console.log(arrayOfTag);
 	// arrayOfTag[0] = arrayOfTag[0].substring(arrayOfTag[0].indexOf("<" + tagName + ">"));
 	// arrayOfTag[arrayOfTag.length - 1] = arrayOfTag[arrayOfTag.length - 1].substring(0, arrayOfTag[arrayOfTag.length - 1].indexOf("</" + tagName + ">") + 3 + tagName.length);
 	return arrayOfTag.join("");
 	*/
 	}

var string = "<html lang='en'>\n<head>\n<meta charset='UTF-8'>\n<title>Test!!!!!</title>\n</head><body><p>あいうえお\n</p>\n<p>かきくけこ</p>\n</body></html>";
	var s = findTagAndReturnTagstring(string, "body");
	// console.log(s);
});