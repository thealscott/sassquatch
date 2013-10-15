# Grunt Tasks Overview

*NOTE: 'SASSquatch' is a wicked name, but can be a bugger to type quickly, so 'yeti' can be used as shorthand for all tasks*

### Sample Gruntfile config:

Below is an example of a SASSquatch config object for use in your Gruntfile.js. 

    sassquatch: {
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


### Initial Setup

`grunt sassquatch_setup`

`grunt yeti_setup`

This uses the parameters defined in the SASSquatch config in your Gruntfile to output the base folder and file structure for SASSquatch. It also outputs a default-ish Compass config.rb file. This will be configurable in future, but for now it is just some quite standard output and you can manually edit/remove it. 

You can define your initial modules and pages, as well as your breakpoints and any additional config or helper files you may want.

### Add Page

`grunt sassquatch_add_page:[page name]`

`grunt yeti_add_page:[page name]`

You can add a page to your build, and the plugin will automatically generate the appropriate files, partials and config include lines, to reduce the manual dependency.

### Add Module

`grunt sassquatch_add_module:[module name]`

`grunt yeti_add_module:[module name]`

Same as with adding pages, the plugin handles the files and config for you.