
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

  api_global.file_link = url_link;
}

// ****************以下実際のコード
var global_url = always("http://www.sfc.keio.ac.jp/");

var get_html = ajax_getter("html")(html_trim)(global_url());
var get_css  = ajax_getter("text")(file_find)(global_url());
