"use strict";



// -------------- これより下、関数型プログラムであったほうが楽な関数s なんで、無視しておｋ

// valの存在確認プレディゲート と valがtrueを返すリテラルかを確認するプレディゲート
function existy (val) { return val != null}　
function truthy (val) { return (val !== false) && existy(val)}


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



//指定したtargetと一致する配列keywordsがあればtrue、以外はfalse

function same_here (target, keywords){
  if (_.isEmpty(keywords))
  return undefined;

  else{
    if (keywords[0]===target)
    return true;

    else
    return same_here(target, _.rest(keywords));
  }
}


//aryの中に指定したkeywordsがあればそれだけ消去
//ex. var trim = ary_trimer("a","b"); trim(["a","b","c"]); => c

function ary_trimer (/*keywords*/){
  var keywords = _.toArray(arguments);
  return function(ary) {
    return _.reject(ary,function(element){
      return same_here(element, keywords);
    });
  }
}



// --------------- 以下具体的に使ってく関数の名前を書いていく奴ら

var air_trimmer =  ary_trimer("");
var space_trimmer = ary_trimer(" ");

var nodata_trimmer = _.compose(air_trimmer, space_trimmer);

//---------------- 引数用関数


function logue (data) {

  var html_ary = nodata_trimmer(data.responseText.split("\n"));
  console.log(html_ary);
}



// ****************以下実際のコード


var global_url = always("http://www.sfc.keio.ac.jp/");

var get_html = ajax_getter("html")(logue)(global_url());
var get_css  = ajax_getter("text")(logue)(global_url());
