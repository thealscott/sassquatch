# (grunt) SASSquatch

**The grunt plugin branch is now the master branch of this project. If you want to see what SASSquatch looks like when implemented, look at the Implemented branch**

SASSquatch is a SASS framework (in as much as such a thing is possible), built on top of Compass.

It splits your SASS code up into a logical groupings, based on the premise of using common modules and page specific layouts/overrides. 

It encourages the use of placeholders and extending base classes, and tries to keep code as modular and reusable as possible while avoiding the pitfalls of overly presentational markup. 

It also aims to give you the tools you need to define and work with responsive design. The structure has been largely driven by the desire to have common placeholder classes that can be extended from within media query blocks.

It can be used Vanilla, but this requires a lot of manual management of adding files and line to import configs, so I recommend using the Grunt plugin.

Both the framework and the Grunt plugin are still in the very early stages, so there is a lot that will probably change, both in terms of the framework approach, and in terms of the functionality of the plugin.

## Framework guide 

*MORE COMING SOON*

I will write more on the structure and thinking behind the actual framework, as well as some additional usage documentation in the near future, but for now I have outline some top level information and guidelines below. 

### Breakpoints
Because of SASS's limitations regarding extending classes across media blocks, in order to have one common source for extensible classes it is neccessary to have each media query as a separate compiled file. Each breakpoint generates a separate SASS file that will compile to separate CSS files. These should all be included in your HTML.

*NOTE: I would rather be able to compile everything into a single CSS file, but at present some quirks of SASS seem to preclude the possibility so long as you want to make use of extensible classes declared outside the media block. I had originally hoped to avoid this by redeclaring those placeholders within each media block by calling the mixin again within the block, but SASS seems to ignore these declarations when you try and compile everything together, and so the first declaration still triggers the extend error on compile* 

### Modules
Modules are where modular style sets can be kept. These are styles that will be reused across the design, things like buttons, typography rules and so forth. Ideally you define placeholder classes here, that can be "instantiated" by extending them in your main/page styles, attached to semantic classes.  

### Pages
Page/pagetype specific markup hooks and styling should happen here. This requires the use of page type hooks (I suggest on the body element) in order to "namespace" your styles for a specific page or type of page. I find this approach useful, even if you are working on a very uniform page design, but obviously it is most useful when designs vary between pages.

### Config
Generally you will be using scoped variables inside all the pages/modules, but if you need universal config variables, here is where to put them. In addition, the system config (import lists) will be in this folder too. As an example of a config, I use a color map where I can assign more memorable names for commonly used colors in the theme, without assigning them semantic var names. 

### Helpers
If you have general utility mixins or functions over and above compass, this is the place for them to live.

### The Constructor
The constructor currently lives in the helpers folder (though I might move it, as it is special) and it serves a role similar to what its name implies. Each breakpoint stylesheet starts by including the constructor. In the constructor we should define any and all modules and helpers that you want to be universally applied/available. If you don't include them in the constructor, you need to include them manually either in your page styles or in your breakpoint styles.

## Plugin Features and tasks

*NOTE: 'SASSquatch' is a wicked name, but can be a bugger to type quickly, so 'yeti' can be used as shorthand for all tasks*

### Initial SASSquatch installation/setup.

`grunt sassquatch_setup`

`grunt yeti_setup`

This uses the parameters defined in the SASSquatch config in your Gruntfile to output the base folder and file structure for SASSquatch. It also outputs a default-ish Compass config.rb file. This will be configurable in future, but for now it is just some quite standard output and you can manually edit/remove it. 

You can define your initial modules and pages, as well as your breakpoints and any additional config or helper files you may want.

The sample config in the plugin gruntfile includes:
* home page
* contact page
* typography module
* buttons module
* color map config

*NOTE: At the moment, it seems like you HAVE to explicitly add a SASSquatch config to your top level Gruntfile; the plugin doesnt fall back to what's defined in the plugin gruntfile as default. I am sure there is a way to do this, but I am a novice with grunt, so for now bear with me!*

### Add Page

`grunt sassquatch_add_page:[page name]`

`grunt yeti_add_page:[page name]`

You can add a page to your build, and the plugin will automatically generate the appropriate files, partials and config include lines, to reduce the manualy dependancy.

### Add Module

`grunt sassquatch_add_module:[module name]`

`grunt yeti_add_module:[module name]`

Same as with adding pages, the plugin handles the files and config for you.

## Future plugin features

* Removing pages and modules.
* Adding and removing helpers and configs
* Setting default modules to be added to constructor automatically
