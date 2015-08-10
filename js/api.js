"use strict";

function existy (val) { return val != null}
function truthy (val) { return (val !== false) && existy(val)}


function always(VALUE) {
  return function() {
    return VALUE;
  };
}


function ajax_getter (TYPE){
  return function (FUN){
    return function (URL) {
      return function () {
        $.get(URL,FUN,TYPE);
      };
    };
  };
}




function logue (data) {
  // $("div").append(data.responseText);

  console.log(data);
}

var global_url = always("http://www.sfc.keio.ac.jp/");
var get_html = ajax_getter("html")(logue)(global_url());

console.log(get_html());
