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

  var sassquatch_methods = {
    'setup' : function() {
      grunt.log.write('Running full SASSquatch setup, from config JSON');

      var config = grunt.config.get('sassquatch');

      config.pages.forEach(function(value, index){
        sassquatch_methods.add_page(value);
      });

      config.modules.forEach(function(value, index){
        sassquatch_methods.add_module(value);
      });

    },
    'add_page' : function(page_name) {
      grunt.log.write('New page: "'+ page_name + '"');

      var config = grunt.config.get('sassquatch'),
          breakpoints = config.breakpoints,
          content = '@import "base";\r\n';

      breakpoints.forEach(function(value, index){
        content += '@import "'+ value +'";\r\n';

        var local_content = ''+
        '@mixin '+ page_name +'_'+ value +'() {\r\n' +
        '}';


        grunt.file.write('sass/pages/'+ page_name +'/_'+ value +'.scss', local_content);
        grunt.log.write('Added breakpoint: "'+ value + '"').ok();
      });

      grunt.file.write('sass/pages/'+ page_name +'/_base.scss', '@mixin '+ page_name +'_base() {\r\n}');
      grunt.log.write('Added breakpoint: "base"').ok();

      grunt.file.write('sass/pages/'+ page_name +'/_'+ page_name+ '.scss', content);
      grunt.log.write('Added page: "'+ page_name + '"').ok();


      var imports_config = grunt.file.read('sass/config/_imports_pages.scss');
      imports_config += '\r\n@import "pages/'+ page_name +'/'+ page_name +'";';
      
      grunt.file.write('sass/config/_imports_pages.scss', imports_config);

      grunt.log.write('Added line to config/_imports_pages for "'+ page_name + '"').ok();

    },
    'add_module' : function(module_name) {
      grunt.log.write('New module: "'+ module_name + '"');

      var content = ''+
        '@mixin '+ module_name +'() {\r\n' +
        '    %'+ module_name +'_example {\r\n'+
        '    }\r\n'+
        '}';
      
      grunt.file.write('sass/modules/_'+ module_name +'.scss', content);

      grunt.log.write('Added module: "'+ module_name + '"').ok();

      var imports_config = grunt.file.read('sass/config/_imports_modules.scss');
      imports_config += '\r\n@import "modules/'+ module_name +'";';

      grunt.file.write('sass/config/_imports_modules.scss', imports_config);

      grunt.log.write('Added line to config/_imports_modules for "'+ module_name + '"').ok();
    }
  }



  grunt.registerTask('add_page', 'Add a new page to SASSquatch project', sassquatch_methods.add_page);
  grunt.registerTask('add_module', 'Add a new module to SASSquatch project', sassquatch_methods.add_module);
  grunt.registerTask('setup', 'Setup a full SASSquatch project based on config JSON', sassquatch_methods.setup);

};