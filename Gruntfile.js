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
    add_page: {
      options: {
        breakpoints : ['480', '768', '960']
      }
    },
    add_module: {
      options: {

      } 
    }
  });

  grunt.registerTask('add_page', 'Add a new page to SASSquatch project', function(page_name) {
    grunt.log.write('New page: "'+ page_name + '"');

    var config = grunt.config.get('add_page'),
        breakpoints = config.options.breakpoints,
        length = breakpoints.length,
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


    var imports_config = grunt.file.read('sass/config/_imports.scss');
    imports_config += '\r\n@import "pages/'+ page_name +'/'+ page_name +'";';
    
    grunt.file.write('sass/config/_imports.scss', imports_config);

    grunt.log.write('Added line to config/_imports for "'+ page_name + '"').ok();

  });

  grunt.registerTask('add_module', 'Add a new module to SASSquatch project', function(module_name) {
    grunt.log.write('New module: "'+ module_name + '"');

    var content = ''+
      '@mixin '+ module_name +'() {\r\n' +
      '    %'+ module_name +'_example {\r\n'+
      '    }\r\n'+
      '}';
    
    grunt.file.write('sass/modules/_'+ module_name +'.scss', content);

    grunt.log.write('Added module: "'+ module_name + '"').ok();

    var imports_config = grunt.file.read('sass/config/_imports.scss');
    imports_config += '\r\n@import "modules/'+ module_name +'";';

    grunt.file.write('sass/config/_imports.scss', imports_config);

    grunt.log.write('Added line to config/_imports for "'+ module_name + '"').ok();
    

  });

};