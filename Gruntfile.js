
module.exports = function(grunt) {
  grunt.initConfig({

    // Read default package
    pkg: grunt.file.readJSON('package.json'),

    // JShint the src files
    jshint: {
      files:{
        src: ['./src/**/*.js']
      }
    },

    // Browserify
    browserify: {
      dist: {
        files: {
          './dist/rasterizeElement.js': ['./index.js'],
        },
      }
    },

    // Minify the `dist/rasterizeElement.js`
    uglify:{
      min:{
        files: {
          './dist/rasterizeElement.min.js': ['./dist/rasterizeElement.js'],
        }
      },
    },

    // Watch srcFiles for change
    watch: {
      scripts: {
        files: ['./src/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('build', ['jshint', 'browserify', 'uglify:min']);
  grunt.registerTask('default', ['build']);

}
