/*
 * sassquatch-test
 * https://github.com/al.scott/test-grunt-plugin
 *
 * Copyright (c) 2013 Al Scott
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var sassquatch = require('./lib/sassquatch').init(grunt);

  grunt.registerTask('sassquatch_add_page', 'add a sassquatch page (do\'nt run before running sassquatch_setup)', sassquatch.add_page);
  grunt.registerTask('yeti_add_page', 'add a sassquatch page  (do\'nt run before running sassquatch_setup)', sassquatch.add_page);
};