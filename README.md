# (grunt) SASSquatch

SASSquatch is a SASS framework (in as much as such a thing is possible), built on top of Compass.

It splits your SASS code up into a logical groupings, based on the premise of using common modules and page specific layouts/overrides. 

It encourages the use of placeholders and extending base classes, and tries to keep code as modular and reusable as possible. 

It also aims to give you the tools you need to define and work with responsive design. The structure has been largely driven by the desire to have common placeholder classes that can be extended from within media query blocks.

It can be used Vanilla, but this requires a lot of manual management of adding files and line to import configs, so I recommend using the Grunt plugin.

Both the framework and the Grunt plugin are still in the very early stages, so there is a lot that will probably change, both in terms of the framework approach, and in terms of the functionality of the plugin.

## Plugin Features:

### Initial SASSquatch installation/setup.
This uses the parameters defined in your package.json SASSquatch config to output the base folder and file structure for SASSquatch.

You can define your initial modules and pages, as well as your breakpoints.

### Add Page
You can add a page to your build, and the plugin will automatically generate the appropraite files, paritals and config include lines, to reduce the manualy dependancy.

### Add Module
Same as with adding pages, the plugin handles the files and config for you.

## Future plugin features:

* Removing pages and modules.
* Setting default modules to be added to constructor automatically
