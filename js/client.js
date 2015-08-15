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