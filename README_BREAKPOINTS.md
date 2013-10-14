# Breakpoints

Because of SASS's limitations regarding extending classes across media blocks, in order to have one common source for extensible classes it is necessary to have each media query as a separate compiled file. Each breakpoint generates a separate SASS file that will compile to separate CSS files. These should all be included in your HTML.

*NOTE: I would rather be able to compile everything into a single CSS file, but at present some quirks of SASS seem to preclude the possibility so long as you want to make use of extensible classes declared outside the media block. I had originally hoped to avoid this by redeclaring those placeholders within each media block by calling the mixin again within the block, but SASS seems to ignore these declarations when you try and compile everything together, and so the first declaration still triggers the extend error on compile. I have a plan for the next version that will make this a little less fiddly* 

## Configuring breakpoints

    sassquatch: {
      breakpoints : [
        // base always exists
        '480',
        '768', 
        '960'
      ]
    }

You can use as many or as few breakpoints in your config as you like. I advocate and encourage a mobile first approach, but there is not particular compulsion to work this way. 

Base serves as the primary stylesheet, and whether you are working up or down from there in terms of media queries, it doesn't really matter. Just make sure they are in the desired order in the config when running the setup task.

*NOTE: A slight change to the way main breakpoints are configured is in the pipeline. I plan to amend the concept slightly so that you could have non-numeric breakpoints, useful for using something other than browser width as the media query.*

### Breakpoints in Pages

The breakpoints you configure will also be used when generating Pages. See the [Pages documentation](README_PAGES.md) for more detail. 

## Using the Breakpoint files

The Breakpoint files are at the bottom of the stack in SASSquatch. They are the point at which you would break the code down at the page level.  

Generally the bulk of your code should exist in separate pages, modules and helpers, but you can certainly put any other code you like in these files as well, if that is more convenient and the scale of the project allows it.

Below are some examples of what the main breakpoint files could look like:

### Base.scss

    @import "compass/reset"; 
    @import "config/imports"; 
    
    @include construct() {
        @include default_page_base;
    
        #home_page {
            @include home_page_base;
        }
    
        #contact_page {
            @include contact_page_base;
        }
    };

### 480.scss

    @media only screen and (min-width: 480px) {
       @import "config/imports";
       
       @include construct() {
            @include default_page_480;
    
            #home_page {
                @include home_page_480;
            }
        
            #contact_page {
                @include contact_page_480;
            }
        };
    }

