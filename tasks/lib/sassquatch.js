exports.init = function(grunt) {
  var sassquatch = {
    'setup' : function() {
      grunt.log.write('Running full SASSquatch setup, from config JSON');

      var config = grunt.config.get('sassquatch'),
          methods = config.methods;

      config.pages.forEach(function(page, index){
        methods.add_page(page);
      });

      config.modules.forEach(function(module, index){
        methods.add_module(module);
      });

      config.breakpoints.forEach(function(breakpoint, index){

        var output = '@media only screen and (min-width: '+ breakpoint +'px) {\r\n'+
        ' @import "config/imports";\r\n'+
        ' \r\n'+
        '  @include construct() {\r\n'+
        '    @include default_page_'+ breakpoint +';\r\n'+
        '  };\r\n'+
        '}';

        grunt.file.write(config.sass_path +'/'+ breakpoint +'.scss', output);
        grunt.log.write('Added breakpoint stylesheet: "'+ breakpoint + '"').ok();
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


        grunt.file.write(config.sass_path +'/pages/'+ page_name +'/_'+ value +'.scss', local_content);
        grunt.log.write('Added breakpoint: "'+ value + '"').ok();
      });

      grunt.file.write(config.sass_path +'/pages/'+ page_name +'/_base.scss', '@mixin '+ page_name +'_base() {\r\n}');
      grunt.log.write('Added breakpoint: "base"').ok();

      grunt.file.write(config.sass_path +'/pages/'+ page_name +'/_'+ page_name+ '.scss', content);
      grunt.log.write('Added page: "'+ page_name + '"').ok();

      // brittle
      // var imports_config = grunt.file.read('sass/config/_imports_pages.scss');
      // imports_config += '\r\n@import "pages/'+ page_name +'/'+ page_name +'";';
      
      // grunt.file.write('sass/config/_imports_pages.scss', imports_config);

      grunt.log.write('Added line to config/_imports_pages for "'+ page_name + '"').ok();

    },
    'add_module' : function(module_name) {
      grunt.log.write('New module: "'+ module_name + '"');

      var config = grunt.config.get('sassquatch'),
          content = ''+
            '@mixin '+ module_name +'() {\r\n' +
            '    %'+ module_name +'_example {\r\n'+
            '    }\r\n'+
            '}';
      
      grunt.file.write(config.sass_path +'/modules/_'+ module_name +'.scss', content);

      grunt.log.write('Added module: "'+ module_name + '"').ok();

      // var imports_config = grunt.file.read('sass/config/_imports_modules.scss');
      // imports_config += '\r\n@import "modules/'+ module_name +'";';

      // grunt.file.write('sass/config/_imports_modules.scss', imports_config);

      grunt.log.write('Added line to config/_imports_modules for "'+ module_name + '"').ok();
    }
  }

  return sassquatch;
}

