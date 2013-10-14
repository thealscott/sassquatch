exports.init = function(grunt) {
  var sassquatch = {
    default_config: {
      compass : true,
      sass_path : 'sass',
      extra_configs : [
        'color_map'
      ],
      helpers : [
        'polyfills'
      ],
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
    },

    'setup' : function() {
      grunt.log.subhead('Running full SASSquatch setup, from Gruntfile.js config');

      var config = grunt.config.get('sassquatch'),
          template = null,
          write_path = null;

      if (!config) config = sassquatch.default_config;

      // Cool, do you want a compass config? 
      if (config.compass != null && config.compass != false) {
        // let's output a standard compass config!
        template = grunt.file.read(__dirname + '/../templates/config.rb');
        write_path = 'config.rb';

        try {
          sassquatch.write_to_template(template, write_path, null);
          grunt.log.write('Added Compass config.rb').ok();
        }
        catch (error) {
          grunt.log.error().error(error.message);
          grunt.fail.warn('Failed to add Compass config.rb');
        }
      }

      // Ok, let's get this party started by creating all the config files that are always there
      try {
        grunt.file.write(config.sass_path +'/config/_imports_pages.scss', '');
        grunt.file.write(config.sass_path +'/config/_imports_modules.scss', '');
        grunt.log.write('Added import configs').ok();
      }
      catch (error) {
        grunt.log.error().error(error.message);
        grunt.fail.warn('Failed to add import configs');
      }
      
      // now we add the extra stuff from the config

      //extra configs
      config.extra_configs.forEach(function(value, index) {
        try {
          grunt.file.write(config.sass_path +'/config/_'+ value +'.scss', '');
          grunt.log.write('Added config file: "'+ value +'"').ok();
        }
        catch (error) {
          grunt.log.error().error(error.message);
          grunt.fail.warn('Failed to add config file: "'+ value +'"');
        }
      });

      //and helpers
      config.helpers.forEach(function(value, index) {
        try {
          grunt.file.write(config.sass_path +'/helpers/_'+ value +'.scss', '');
          grunt.log.write('Added helper file: "'+ value +'"').ok();
        }
        catch (error) {
          grunt.log.error().error(error.message);
          grunt.fail.warn('Failed to add helper file: "'+ value +'"');
        }
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

      template = grunt.file.read(__dirname + '/../templates/config_imports.scss');
      write_path = config.sass_path + '/config/_imports.scss';
      sassquatch.write_to_template(template, write_path, replacements);

      template = grunt.file.read(__dirname + '/../templates/constructor.scss');
      write_path = config.sass_path + '/helpers/_constructor.scss';
      sassquatch.write_to_template(template, write_path, replacements);

      template = grunt.file.read(__dirname + '/../templates/base.scss');
      write_path = config.sass_path + '/base.scss';
      sassquatch.write_to_template(template, write_path, replacements);

      // Add the default page type
      sassquatch.add_page('default');
      
      // All the standard bits done, now lets look at the configured pages, modules and breakpoints.
      config.pages.forEach(function(page, index){
        sassquatch.add_page(page);
      });

      config.modules.forEach(function(module, index){
        sassquatch.add_module(module);
      });

      config.breakpoints.forEach(function(breakpoint, index){

        var output = '@media only screen and (min-width: '+ breakpoint +'px) {\r\n'+
        '   @import "config/imports";\r\n'+
        '   \r\n'+
        '   @include construct() {\r\n'+
        '       @include default_page_'+ breakpoint +';\r\n'+
        '   };\r\n'+
        '}';

        try {
          grunt.file.write(config.sass_path +'/'+ breakpoint +'.scss', output);
          grunt.log.write('Added breakpoint stylesheet: "'+ breakpoint + '"').ok();
        }
        catch (error) {
          grunt.log.error().error(error.message);
          grunt.fail.warn('Failed to add breakpoint stylesheet: "'+ breakpoint +'"');
        }
      });

      
    },
    'add_page' : function(page_name) {
      grunt.log.writeln('New page: "'+ page_name + '"');

      var config = grunt.config.get('sassquatch');
      if (!config) config = sassquatch.default_config;

      var breakpoints = config.breakpoints,
          content = '@import "base";\r\n';

      breakpoints.forEach(function(value, index){
        content += '@import "'+ value +'";\r\n';

        var local_content = ''+
        '@mixin '+ page_name +'_page_'+ value +'() {\r\n' +
        '}';

        try {
          grunt.file.write(config.sass_path +'/pages/'+ page_name +'/_'+ value +'.scss', local_content);
          grunt.log.write('Added breakpoint: "'+ value + '"').ok();
        }
        catch (error) {
          grunt.log.error().error(error.message);
          grunt.fail.warn('Failed to add breakpoint: "'+ value +'"');
        }
        
      });

      try {
        grunt.file.write(config.sass_path +'/pages/'+ page_name +'/_base.scss', '@mixin '+ page_name +'_page_base() {\r\n}');
        grunt.log.write('Added breakpoint: "base"').ok();
      }
      catch (error) {
        grunt.log.error().error(error.message);
        grunt.fail.warn('Failed to add breakpoint: "base"');
      }

      try {
        grunt.file.write(config.sass_path +'/pages/'+ page_name +'/_'+ page_name+ '.scss', content);
        grunt.log.write('Added page: "'+ page_name + '"').ok();
      }
      catch (error) {
        grunt.log.error().error(error.message);
        grunt.fail.warn('Failed to add page: "'+ page_name +'"');
      }

      var imports_config = grunt.file.read(config.sass_path +'/config/_imports_pages.scss');
      imports_config += '\r\n@import "pages/'+ page_name +'/'+ page_name +'";';
      try {
        grunt.file.write(config.sass_path +'/config/_imports_pages.scss', imports_config);
        grunt.log.write('Added line to config/_imports_pages for "'+ page_name + '"').ok();
      }
      catch (error) {
        grunt.log.error().error(error.message);
        grunt.fail.warn('Failed to add line to config/_imports_pages: "'+ module_name +'"');
      }
    },
    'add_module' : function(module_name) {
      grunt.log.write('New module: "'+ module_name + '"');

      var config = grunt.config.get('sassquatch'),
          content = ''+
            '@mixin '+ module_name +'() {\r\n' +
            '    %'+ module_name +'_example {\r\n'+
            '    }\r\n'+
            '}';

      if (!config) config = sassquatch.default_config;
      
      try {
        grunt.file.write(config.sass_path +'/modules/_'+ module_name +'.scss', content);
        grunt.log.write('Added module: "'+ module_name + '"').ok();
      }
      catch (error) {
        grunt.log.error().error(error.message);
        grunt.fail.warn('Failed to add module: "'+ module_name +'"');
      }


      var imports_config = grunt.file.read(config.sass_path +'/config/_imports_modules.scss');
      imports_config += '\r\n@import "modules/'+ module_name +'";';
      try {
        grunt.file.write(config.sass_path +'/config/_imports_modules.scss', imports_config);
        grunt.log.write('Added line to config/_imports_modules for "'+ module_name + '"').ok();
      }
      catch (error) {
        grunt.log.error().error(error.message);
        grunt.fail.warn('Failed to add line to config/_imports_modules: "'+ module_name +'"');
      }

    },
    'write_to_template' : function(template, write_path, replacements) {
      for (var key in replacements) {
        template = template.replace('[['+ key +']]', replacements[key]);
      }

      try {
        grunt.file.write(write_path, template);
        grunt.log.write('Wrote to template: "'+ write_path +'"').ok();
      }
      catch (error) {
        grunt.log.error().error(error.message);
        grunt.fail.warn('Failed to write template: "'+ write_path +'"');
      }
    } 
  }

  return sassquatch;
}

