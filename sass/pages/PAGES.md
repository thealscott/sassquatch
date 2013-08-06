#Pages

The idea is that you have page files, that have all your specific styling for different pages. You "instantiate" a page by calling the mixin from within an id selector from the higher level SCSS file (ie _base.scss or a breakpoint sheet)

Still working out the best way to handle this and reconcile it with media query requirements.

In my head it kind of works like the page "class" has a load of placeholder classes within it for specific elements, then when you "instantiate" it, you can extend the placeholders you want.

This might not be scalable. 
