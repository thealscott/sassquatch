# Config

Generally you will be using scoped variables inside all the pages/modules, but if you need universal config variables, here is where to put them. In addition, the system config (import lists) will be in this folder too. As an example of a config, I use a color map where I can assign more memorable names for commonly used colors in the theme, without assigning them semantic var names. 

## System config files

These files are added and maintained by the plugin:
    
    config
        _imports.scss
        _imports_modules.scss
        _imports_pages.scss

The main imports config is where you will need to manage importing new helpers and config files until the functionality for adding these dynamically is added to the plugin. 

*NOTE: You are not able to do this on the fly just yet, but if you define configs and helpers in the plugin's config object in your Gruntfile.js it will add the files and make the needed imports on setup*

Any _imports file with a suffix should not be messed with, as these files are handled dynamically by the plugin, with the exception of deletion (coming soon).

## User config files

You can add your own config files for holding global variables you may want to use throughout your project. Any variables declared within modules or pages will be locally scoped as they all sit inside a mixin wrapper.

You can define additional config files in the SASSquatch config object in your Gruntfile.js.