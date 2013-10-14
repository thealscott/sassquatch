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
    sassquatch: {
      compass : true,
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
        'home',
        'contact'
      ],
      modules : [
        'typography',
        'buttons'
      ]
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
};
