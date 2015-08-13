  module.exports = function(grunt) {
    grunt.initConfig({
      //loading package.json ( not necessary
      pkg: grunt.file.readJSON('package.json'),

      jshint: {

        files: ["js/app.js"],
        options: {
          jshintrc: ".jshintrc",
          force: true
        }
      },

      connect:{
        server:{
          options:{
            port: 8000,  // 適当で可
            keepalive: true,
            hostname: 'localhost',
            base: '.'
          }
        }
      },

      watch: {
        javascript_api: {
          files: ['js/client/*.js', "js/api/*.js"],
          tasks: ['concat', "jshint"],
        }
      },

      concat: {
          api: {
          src: ['./js/api/higher.js','./js/api/get_source.js'],
          dest: './js/api.js',
        },
          client: {
            src: ['./js/client/preview.js', './js/client/bind.js'],
            dest: './js/client.js',
          },
          application: {
            src:['./js/api.js','./js/client.js'],
            dest: './js/app.js',
          },
      }

      //setting tasks
    });

    //loading the plague in (ex. grunt.loadNpmTasks('grunt-contrib-xxxx');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-concat");
    //setting "Default tasks"
    grunt.registerTask("start", ["watch"]);
    grunt.registerTask("s", ["connect"]);
    grunt.registerTask("default",function() {
      grunt.log.writeln('だから、grunt start だってｗ\n 詳しくは grunt help');
    });
    grunt.registerTask("help",function() {
      grunt.log.writeln('s (connect) =>local server \n start (watch) =>manage your js \n  ');
    });

  }
