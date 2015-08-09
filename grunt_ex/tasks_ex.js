/*
this is the example of Grunt file.

below IDIOM is file concat task. (it makes some files being only one file)


and,,,
these tasks might be used, 

タスク名	説明
grunt-contrib-concat	ファイル連結
grunt-contrib-copy	ファイルコピー
grunt-contrib-uglify	JavaScriptのminify
grunt-contrib-jshint	JavaScript構文チェック
grunt-contrib-watch	ファイル変更監視


*/


concat: {
    page1 : {
        src : [
            "app/scripts/page1.feature1.js",
            "app/scripts/page1.feature2.js",
            "app/scripts/page1.feature3.js"
        ],
        dest: "public/javascripts/page1.js"
    },
    page2 : {
        src : [
            "app/scripts/page2.feature1.js",
            "app/scripts/page1.feature2.js"
        ],
        dest: "public/javascripts/page2.js"
    }
},
