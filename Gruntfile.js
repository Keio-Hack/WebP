module.exports = function(grunt) {
    grunt.initConfig({
    //loading package.json ( not necessary
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ["js/*.js"],
            options: {
              jshintrc: ".jshintrc",
              force: true
            }
        },

        watch: {
            javascript: {
              files: ['js/*.js'],
              tasks: ['jshint'],
                        }
               }

    //setting tasks
    });

    //loading the plague in (ex. grunt.loadNpmTasks('grunt-contrib-xxxx');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch")
    //setting "Default tasks"
    grunt.registerTask("start", ["watch"]);
    grunt.registerTask("pkg", ["pkg"]);
    grunt.registerTask("default",function() {
    grunt.log.writeln('だから、grunt start だってｗ');
  })
}
