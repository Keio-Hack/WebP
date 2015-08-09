

$("#button").on("click", function(){
  var url = "http://www.sfc.keio.ac.jp/";
  //ここでurl指定。ほんとはユーザが入力した値を使うべきだが、urlとして成立しているかなどのテェックが必要なため
  //実装はまた今度で。urlとして成立しているかなどのテェックがなければ実装はすぐにできます。
  $.get(url, function(data){
    var pageHtmlResource = data.responseText;
    console.log(data);
    // console.log(pageHtmlResource + "");

    var bodyString = findTagAndReturnTagstring(pageHtmlResource, "body");
    $("body").append("<div>bodyの文字列は" + bodyString + "</div>");
    var bodyObj = $(bodyString); //body要素内のDOM要素のオブジェクト化完了


    // var headString = findTagAndReturnTagstring(pageHtmlResource, "head");
    var link = findTagAndReturnTagstring_SingleTagVer(pageHtmlResource, "link");
    alert(link);
    var linkHrefArray = $("<div>" + link+ "</div>").find("link").map(function(){return $(this).attr("href")}).toArray();
    // console.log(linkHrefArray);
    var arrayOfCssFileAbsoluteURL = makingCssFileURL(linkHrefArray, url);
    // console.log(arrayOfCssFileAbsoluteURL);
    var arrayAfterFiltering = filterWithExtension(arrayOfCssFileAbsoluteURL, ".css");
    console.log(arrayAfterFiltering);
    $.get(arrayAfterFiltering[1], function(data){
      console.log(data.responseText);
    });
  });
});






$("#getCssButton").on("click", function(){
  var url = "http://syrinx.q.t.u-tokyo.ac.jp/tori/java/css/java.css";
  $.get(url, function(data){
    var pageCssSource = data.responseText;
    console.log(pageCssSource);
  })
});
