
"use strict";

//名前空間汚染対策
var api_global = {};


// -------------- これより下、関数型プログラムであったほうが楽な関数s なんで、無視しておｋ

// valの存在確認プレディゲート と valがtrueを返すリテラルかを確認するプレディゲート
function existy (val) { return val != null}　
function truthy (val) { return (val !== false) && existy(val)} //valがtrueなやつかどうか確認プレディゲート
function fail   (msg) { throw new Error(msg)} //エラーを吐く

function always(VALUE) { //valueを常に返すクロージャ
  return function() {
    return VALUE;
  };
}

function doWhen (cond, func) { //ifをカプセル化したやつ
  if (truthy(cond))
  return func();

  else
  return undefined;
}



// -------------- これより下、高階関数。関数を作る関数でし。 / 再帰関数 自分を呼び出す関数

//$.getの引数指定のカリー化関数,
//順番はtype,callback,url
function ajax_getter (TYPE){
  return function (FUN){
    return function (URL) {
      return function () {
        $.get(URL,FUN,TYPE);
      };
    };
  };
}


//指定したtargetとkeywords(ary)をpred(pred_function)を元にtrue,falseを返すpredicate関数
function whatever_here(pred){
  return function closure (target, keywords){
    if (_.isEmpty(keywords)){
      return false;
    }
    else{
      var searcher = keywords[0];
      if (pred(target,searcher))
      return true
      else
      return closure(target, _.rest(keywords));

    }
  }
}


//aryの中にpred関数でkeywordsと照合した時にtrueと変えるやつがいたらtypeの関数を実行する
function ary_trimer (/*keywords*/){
  var keywords = _.toArray(arguments);
  return function (type){
    return function(pred){
      return function(ary) {
        if(!_.isArray(ary)) fail("arguments must be Array");
        return _[type].call(null,ary,function(element){
          return pred.apply(null,[element, keywords]);
        });
      }
    }
  }
}


// --------------- 以下具体的に使ってく関数の名前を書いていく奴ら

//func:same_here(target,keywords)  keywords(ary)の中にtargetと同じものがあればtrue、なければfalse
var same_here = whatever_here(function (a,b) { return a===b ? true : false });

//func;included_here(target, keywords)  keywords(ary)の中にtargetが含まれるヨウ素があればtrue,以外false
var included_here = whatever_here(function (a,b) { return (a.indexOf(b)!==-1) ? true : false});


//以下二つとも、nodata_rejecterに含まれる
var air_rejecter =  ary_trimer("")("reject")(same_here);
var space_rejecter = ary_trimer("  ")("reject")(same_here);

//func:nodata_rejecter(ary) aryの中の""と" "を消去する
var nodata_rejecter = _.compose(air_rejecter, space_rejecter);

//func:file_finder(ary) aryの中にある"link"と"script"タグを抜き出す
var file_finder = ary_trimer("<link","<script")("filter")(included_here);

//func:url_link_finder(ary) aryの中にある"src"と"href"を抜き出す
var url_link_finder = ary_trimer("src", "href")("filter")(included_here);

//func:split_marge(str,exp) split関数の消去しない版。
function split_marge (str,exp) {
  var result = str.split(new RegExp(exp));
  var res_length = result.length
  for (var i = 0; i < res_length; i++) {
    result[i] += exp;
  }
  return result;

}

//func:multi_replace(target,after/*options*/) target(str)の中にあるoptions(regexp)のものをafterに置き換える
function multi_replace (target,after/*keywords*/) {
  var keywords = _.rest(arguments,2);
  var key_length = keywords.length;
  for (var i = 0; i < key_length; i++) {
    target = target.replace(new RegExp(keywords[i]),after);
  }
  return target;
}


//---------------- 引数用関数

function html_trim (data) {
  var html_ary = nodata_rejecter(split_marge(data.responseText, ">"));
  api_global.html = html_ary;
}


function file_find (data){
  var files = file_finder(split_marge(data.responseText, ">"));

  var url_link = _.map(files,function(h){
    var url_attr = url_link_finder(h.split(" ")).join("");
    return multi_replace(url_attr,"",/href=/gi,/"/gi);
  });
  var absolute_url = _.map(url_link, function(h) {if(!included_here(h,["http"])) return [api_global.url(), h].join("")});

  api_global.file_link = absolute_url;
}

// ****************以下実際のコード
api_global.url = always("https://life-is-tech.com/");

var get_html = ajax_getter("html")(html_trim)(api_global.url());
var get_css  = ajax_getter("text")(file_find)(api_global.url());

function set_iframe(){
	var iframe = window.frames[0];
	var iframe_body = iframe.document.body;
	var iframe_head = iframe.document.getElementsByTagName("head");
	var css_finder = ary_trimer("css")("filter")(included_here);
	var css_link = css_finder(api_global.file_link);
	var html_ary = api_global.html;
	// console.log(html_ary);
	var body_start;
	var body_end;
	for(var i = 0, k = html_ary.length; i < k; i++){
		if(/<body.*>/.test(html_ary[i])){
			body_start = i;
		}
		if(/<\/body>/.test(html_ary[i])){
			body_end = i;
		}
	}
	// console.log(body_start, body_end);
	var body_str = html_ary.slice(body_start, body_end + 1).join("\n");
	// console.log(body_str);
	var only_csslink_arr = css_link.filter(function(value){
		return value.indexOf(".css") !== -1
	});
	// console.log(only_csslink_arr);
	only_csslink_arr.forEach(function(value){
		$.get(value, function(data){
			$(iframe_head[0]).append("<style>" + data.responseText + "</style>");
		})
	})
	iframe_body.outerHTML = body_str;
	var iframe_images = iframe.document.images;
	_.toArray(iframe_images).forEach(function(value){
		value.src = "../../images/NO_IMG.jpg";
	});
}

$("#button").on("click", get_html);
$("#get_css_button").on("click", get_css);
$("#set_iframe_button").on("click", set_iframe);