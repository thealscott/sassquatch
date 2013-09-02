/*
 * sassquatch-test
 * https://github.com/al.scott/test-grunt-plugin
 *
 * Copyright (c) 2013 Al Scott
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    sassquatch_test: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!',
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    sassquatch: {
      sass_path : 'sass',
      extra_configs : [
        'color_map'
      ],
      helpers : [],
      breakpoints : [
        // base always exists
        '480',
        '768', 
        '960'
      ],
      pages : [
        // default always exists
        'test',
        'test_two'
      ],
      modules : [
        'test_mod',
        'test_mod_two'
      ]
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sassquatch_test', 'nodeunit']);

  var sassquatch = require('./tasks/lib/sassquatch').init(grunt);

  grunt.registerTask('sassquatch_template', 'template test.', sassquatch.template_test);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
