exports.init = function(grunt) {
  var sassquatch = {
    'setup' : function() {
      grunt.log.write('Running full SASSquatch setup, from config JSON');

      var config = grunt.config.get('sassquatch');

      // Ok, let's get this party started by creating all the config files that are always there
      grunt.file.write(config.sass_path +'/config/_imports_pages.scss', '');
      grunt.file.write(config.sass_path +'/config/_imports_modules.scss', '');

      // now we add the extra stuff from the config

      config.extra_configs.forEach(function(value, index) {
        grunt.file.write(config.sass_path +'/config/_'+ value +'.scss', '');
      });

      // Now compile the master imports file
      var replacements = {
        'config_imports' : '',
        'helpers_imports' : ''
      };

      config.extra_configs.forEach(function(value, index) {
        replacements.config_imports += '@import "config/'+ value +'";\r\n';
      });

      config.helpers.forEach(function(value, index) {
        replacements.helpers_imports += '@import "helpers/'+ value +'";\r\n';
      });

      var template = grunt.file.read(__dirname + '/../tasks/templates/config_imports.scss');
      var write_path = config.sass_path + '/config/_imports.scss';

      sassquatch.write_to_template(template, write_path, replacements);

    
      // All the standard bits done, now lets look at the configured pages, modules and breakpoints.
      config.pages.forEach(function(page, index){
        sassquatch.add_page(page);
      });

      config.modules.forEach(function(module, index){
        sassquatch.add_module(module);
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
      var imports_config = grunt.file.read('sass/config/_imports_pages.scss');
      imports_config += '\r\n@import "pages/'+ page_name +'/'+ page_name +'";';
      
      grunt.file.write('sass/config/_imports_pages.scss', imports_config);

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

      var imports_config = grunt.file.read('sass/config/_imports_modules.scss');
      imports_config += '\r\n@import "modules/'+ module_name +'";';

      grunt.file.write('sass/config/_imports_modules.scss', imports_config);

      grunt.log.write('Added line to config/_imports_modules for "'+ module_name + '"').ok();
    },
    'write_to_template' : function(template, write_path, replacements) {
      for (var key in replacements) {
        template = template.replace('[['+ key +']]', replacements[key]);
      }

      grunt.file.write(write_path, template);
    }
  }

  return sassquatch;
}

