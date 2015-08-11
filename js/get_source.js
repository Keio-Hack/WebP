//
//
// //この関数はfindTagAndReturnstringから呼び出す。
// function devideStringByTagname (arr, tagName){
//   var bool = false;
//   var array = arr.slice(0);
//   var testarr = [];
//   for(var i = 0; i < array.length; i++){
//     var value = array[i];
//     if(bool){
//       if(value.search("<\/" + tagName + ">") !== -1){
//         testarr = value.match("(<\/" + tagName + ">)(.*)");
//         // console.log(testarr);
//         array.splice(i, 1, testarr[1], testarr[2]);
//         bool = false;
//       }
//     }else{
//       if(value.search("<" + tagName + ".*>") !== -1){
//         testarr = value.match("(.*)(<" + tagName + ".*>.*)");
//         // console.log(testarr);
//         array.splice(i, 1, testarr[1], testarr[2]);
//         bool = true;
//       }
//     }
//   }
//   // console.log(array);
//   return array;
// }
//
// //この関数はhtml文書の文字列を第一引数として受け取り、抜き出したいタグの名前を第二引数として受け取る。
// //戻り値としてはそのタグの中身の文字列（そのタグの開始タグと閉じタグを含む）を返す。
// function findTagAndReturnTagstring(htmlString, tagName){
//   var arr = htmlString.split("\n");
//   var array = devideStringByTagname(arr, tagName);
//   var bool = false;
//
//   var arrayOfTag = array.filter(function(value, index, arr){
//     if(bool){
//       if(value.search("<\/" + tagName + ">") !== -1){
//         bool = false;
//       }
//       return true;
//     }else{
//       if(value.search("<" + tagName + ".*>") !== -1){
//         bool = true;
//         return true;
//       }
//       return false;
//     }
//
//   });
//   return arrayOfTag.join("");
// }
//
//
//
//
// //以下２つ、開始タグが省略できるタグのための関数。動きは下２つと同じ。
// function devideStringByTagname_SingleTagVer(arr, tagName){
//   var array = arr.slice(0);
//   var testarr = [];
//   for(var i = 0; i < array.length; i++){
//     var value = array[i];
//     if(value.search("<" + tagName + ".*>") !== -1){
//       testarr = value.match("(.*)(<" + tagName + ".*\/>)(.*)");
//       // console.log(testarr);
//       array.splice(i, 1, testarr[1], testarr[2], testarr[3]);
//       i++;
//       // console.log(array[i]);
//     }
//   }
//   return array;
// }
//
// function findTagAndReturnTagstring_SingleTagVer(htmlString, tagName){
//   var arr = htmlString.split("\n");
//   var array = devideStringByTagname_SingleTagVer(arr, tagName);
//
//   var arrayOfTag = array.filter(function(value, index, arr){
//     if(value.search("<" + tagName + ".*>") !== -1){
//       return true;
//     }else{
//       return false;
//     }
//   });
//   return arrayOfTag.join("");
// }
//
// //linkタグのhref属性の値が代入されている配列を第一引数、指定したhtmlファイルのurlを第二引数として受け取る。
// //この２つの引数を元に、ぞれぞれのcssファイルの絶対URLを文字列として生成し、それを配列に格納して返す。
// function makingCssFileURL(hrefArray, htmlFileURL){
//   htmlFileURL = htmlFileURL.match(/(.*\/).*/)[1];
//   var returnArray = hrefArray.map(function(value, index, arr){
//     if(value.indexOf("http") !== -1 || value.indexOf("https") !== -1){
//       return value;
//     }else{
//       value = value.match(/\.?\/?(.*)/)[1];
//       for(var i = 0; true; i++){
//         if(value.indexOf("../") === -1){
//           return  htmlFileURL + value;
//         }else{
//           value = value.match(/\.\.\/(.*)/)[1];
//           htmlFileURL = htmlFileURL.match(/(.*\/).+\//)[1];
//         }
//       }
//     }
//   });
//   return returnArray;
// }
//
// //第一引数にURLの文字列を要素とする配列を、第二引数に拡張子（例えば".css"）を受け取る。
// //これらを元に、指定した拡張子が含まれているURLのみを要素として持つ配列を返す。
// function filterWithExtension(arrayOfCssFileAbsoluteURL, extention){
//   var arr = arrayOfCssFileAbsoluteURL.filter(function(value){
//     // console.log(value);
//     // console.log(value.indexOf(extention));
//     if(value.indexOf(extention) === -1){
//       return false;
//     }else{
//       return true;
//     }
//   });
//   return arr;
// }
//
//
//
//
// function bind_html(){
//   var url = "http://www.sfc.keio.ac.jp/";
//   //ここでurl指定。ほんとはユーザが入力した値を使うべきだが、urlとして成立しているかなどのテェックが必要なため
//   //実装はまた今度で。urlとして成立しているかなどのテェックがなければ実装はすぐにできます。
//
//   $.get(url, function(data){
//     var pageHtmlResource = data.responseText;
//     console.log(data);
//     // console.log(pageHtmlResource + "");
//
//     var bodyString = findTagAndReturnTagstring(pageHtmlResource, "body");
//
//     $("body").append("<div>bodyの文字列は" + bodyString + "</div>");
//     var bodyObj = $(bodyString); //body要素内のDOM要素のオブジェクト化完了
//
//
//     // var headString = findTagAndReturnTagstring(pageHtmlResource, "head");
//     var link = findTagAndReturnTagstring_SingleTagVer(pageHtmlResource, "link");
//     alert(link);
//     function forMap(){return $(this).attr("href")}
//     var linkHref = $("<div>" + link+ "</div>").find("link").map(forMap);
//     var linkHrefArray = linkHref.toArray();
//     // console.log(linkHrefArray);
//     var arrayOfCssFileAbsoluteURL = makingCssFileURL(linkHrefArray, url);
//     // console.log(arrayOfCssFileAbsoluteURL);
//     var arrayAfterFiltering = filterWithExtension(arrayOfCssFileAbsoluteURL, ".css");
//     console.log(arrayAfterFiltering);
//
//     $.get(arrayAfterFiltering[1], function(data){
//       console.log(data.responseText);
//     });
//
//
//   });
// }
//
//
//
//
// function bind_css(){
//   var url = "http://syrinx.q.t.u-tokyo.ac.jp/tori/java/css/java.css";
//   $.get(url, function(data){
//     var pageCssSource = data.responseText;
//     console.log(pageCssSource);
//   })
// }
//
//
//
// function always (VALUE) {
//   return function () {
//     return VALUE;
//   }
// }
