# (grunt) SASSquatch

**The grunt plugin branch is now the master branch of this project. If you want to see what SASSquatch looks like when implemented, look at the [Implemented branch](https://github.com/thealscott/sassquatch/tree/implemented)**

SASSquatch is a SASS framework (in as much as such a thing is possible), built on top of Compass.

It splits your SASS code up into a logical groupings, based on the premise of using common modules and page specific layouts/overrides. 

It encourages the use of placeholders and extending base classes, and tries to keep code as modular and reusable as possible while avoiding the pitfalls of overly presentational markup. 

It also aims to give you the tools you need to define and work with responsive design. The structure has been largely driven by the desire to have common placeholder classes that can be extended from within media query blocks.

It can be used Vanilla, but this requires a lot of manual management of adding files and line to import configs, so I recommend using the Grunt plugin.

Both the framework and the Grunt plugin are still in the very early stages, so there is a lot that will probably change, both in terms of the framework approach, and in terms of the functionality of the plugin.

## Framework guide 

*MORE COMING SOON*

I will write more on the structure and thinking behind the actual framework, as well as some additional usage documentation in the near future, but for now I have outline some top level information and guidelines below. 

### [Breakpoints](README_BREAKPOINTS.md)

### [Modules](README_MODULES.md)

### [Pages](README_PAGES.md)

### [Config](README_CONFIG.md)

### [Helpers](README_HELPERS.md)

### [The Constructor](README_CONSTRUCTOR.md)

## Plugin Features and tasks

This is just a high level overview of available grunt tasks. More details can be found in the Framework documentation.

*NOTE: 'SASSquatch' is a wicked name, but can be a bugger to type quickly, so 'yeti' can be used as shorthand for all tasks*

### Initial SASSquatch installation/setup.

`grunt sassquatch_setup`

`grunt yeti_setup`

This uses the parameters defined in the SASSquatch config in your Gruntfile to output the base folder and file structure for SASSquatch. It also outputs a default-ish Compass config.rb file. This will be configurable in future, but for now it is just some quite standard output and you can manually edit/remove it. 

You can define your initial modules and pages, as well as your breakpoints and any additional config or helper files you may want.

Sample Config:

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

### Add Page

`grunt sassquatch_add_page:[page name]`

`grunt yeti_add_page:[page name]`

You can add a page to your build, and the plugin will automatically generate the appropriate files, partials and config include lines, to reduce the manualy dependancy.

### Add Module

`grunt sassquatch_add_module:[module name]`

`grunt yeti_add_module:[module name]`

Same as with adding pages, the plugin handles the files and config for you.

## Future plugin features

* Adding single css file include support
* Removing pages and modules.
* Adding and removing helpers and configs
* Setting default modules to be added to constructor automatically
