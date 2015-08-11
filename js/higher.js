
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
