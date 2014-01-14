# (grunt) SASSquatch

#### **I have learnt a lot making this plugin and the framework along with it, and what I have learnt has led me to believe that although many of the ideas behind the framework are solid, this exact implementation is deeply flawed. As such, SASSquatch is currently dead. When I get some time I am gonna come back to it though, to take the good ideas and lose the chaff.**

The grunt plugin branch is now the master branch of this project. If you want to see what SASSquatch looks like when implemented, look at the [Implemented branch](https://github.com/thealscott/sassquatch/tree/implemented)

## Introduction

SASSquatch is a SASS framework (in as much as such a thing is possible), built on top of Compass.

It splits your SASS code up into a logical groupings, based on the premise of using common modules and page specific layouts/overrides. 

It encourages the use of placeholders and extending base classes, and tries to keep code as modular and reusable as possible while avoiding the pitfalls of overly presentational markup. 

It also aims to give you the tools you need to define and work with responsive design. The structure has been largely driven by the desire to have common placeholder classes that can be extended from within media query blocks.

It can be used Vanilla, but this requires a lot of manual management of adding files and line to import configs, so I recommend using the Grunt plugin.

Both the framework and the Grunt plugin are still in the very early stages, so there is a lot that will probably change, both in terms of the framework approach, and in terms of the functionality of the plugin.

## Framework documentation

*This is still a work in progress*

[Please view the full docs on Github.](https://github.com/thealscott/sassquatch/blob/master/docs/intro.md)

## Quickstart Guide

This is a concise overview of getting SASSquatch installed and running for you. Please refer to the full docs for info about the structure and logic of the framework.

### Installing Node.js and NPM

Go to [http://nodejs.org/](http://nodejs.org/) and use the handy installation options they offer. 

### Installing Grunt Command Line Interface (CLI)

Now you have NPM, you can install Grunt-CLI. Follow the handy instructions [here](http://gruntjs.com/getting-started).

### Setting up Grunt and SASSquatch in a new project

With Grunt-CLI installed, you can now set up a new project. You can use a [grunt-init template](http://gruntjs.com/project-scaffolding) , or else simply run these tasks from the command line in your working folder:

`npm init` 

This creates *package.json*

`npm install grunt --save-dev` 

This will install grunt to the project and include the dependencies in your package.js automatically.

`npm install sassquatch --save-dev`

As above, but for SASSquatch

`touch Gruntfile.js`

Creates the Gruntfile, where all your grunt tasks and configuration will live.

You can use this sample code below in your Gruntfile to get up and running. Change the config settings for SASSquatch to match your needs, or just try it out with the defaults.

    module.exports = function(grunt) {
    
      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
      });    
      // Load the plugin for SASSquatch
      grunt.loadNpmTasks('grunt-sassquatch');
    };

Now everything is installed and you have a package and gruntfile with all the needed stuff in it, you are ready to start using SASSquatch.

`grunt sassquatch_setup`

This will run SASSquatch for the first time and generate all the framework files you need. It will also generate a *config.rb* file for use with Compass. You will need to manually edit this if you want to change from the default settings. If you are happy with your Compass settings, then all that's left to do is:

`compass watch`

and voila! your SASS will be compiled, and you are ready to roll.

Please refer to the [full docs](https://github.com/thealscott/sassquatch/blob/master/docs/intro.md) and the task overview below for more information.

## Grunt Tasks Overview

*NOTE: 'SASSquatch' is a wicked name, but can be a bugger to type quickly, so 'yeti' can be used as shorthand for all tasks*

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

## Future plugin features (in no particular order)

* Adding single css file include support
* Removing pages and modules.
* Adding and removing helpers and configs
* Setting default modules to be added to constructor automatically
* Non-numeric "breakpoints" (possibly with new name for the concept)
* Configurable Compass config.rb
* Move the Constructor our of Helpers
