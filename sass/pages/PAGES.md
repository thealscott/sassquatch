#Pages

The idea is that you have page files, that have all your specific styling for different pages. You "instantiate" a page by calling the mixin from within an id selector from the higher level SCSS file (ie _base.scss or a breakpoint sheet).

This has been rethought a little. 

Each breakpoint now gets it's own mixin, so you can call it at the appropriate point in the code. 

The pages will be where the bulk of your styling will go.

We keep them in folders because depending on the scale of your project you may want to either shove all your breakpoint mixins into one file, but you may want to break it out into separate files. 

If the former, just put all your styles into the _page_name.scss partial. If the latter, you need to use the partial to run @import on the other partials inside the folder.

Luckily, these can be locally pathed, so this will tend to be the same across the whole project (but be aware, the file does need to exist locally otherwise it tries to find it wherever it can leading to import loops).

Unfortunately imports can't be managed programatically from within the SASS because they don't work within directives or mixins, which is a shame, as it could have meant dynamically importing things according to a config array or perhaps just having a helper mixin for it. C'est la vie. 
