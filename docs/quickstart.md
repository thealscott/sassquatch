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

Please refer to the [full docs](intro.md) and the task overview below for more information.