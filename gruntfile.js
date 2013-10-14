module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    sassquatch: {
	  compass : true,
	  sass_path : 'sass',
	  extra_configs : [
	    'color_map'
	  ],
	  helpers : [
	    //'polyfills' TODO: this is broke, yo. It's adding the line to the imports config, but not creating the file.
	  ],
	  breakpoints : [
	    // base always exists
	    '600',
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

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin for SASSquatch
  grunt.loadNpmTasks('grunt-sassquatch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};