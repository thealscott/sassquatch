# Pages

Page/pagetype specific markup hooks and styling should happen here. This requires the use of page type hooks (I suggest on the body element) in order to "namespace" your styles for a specific page or type of page. I find this approach useful, even if you are working on a very uniform page design, but obviously it is most useful when designs vary between pages.

## The Default Page

The default page is generated automatically as part of the setup task. 

You would use this set of page files to define your default or standard page styles, which can be included as baseline styles to be overridden as needed, or as a specific page layout for pages that dont have their own specific layout.

## Adding a page

`grunt sassquatch_add_page:[page name]`

`grunt yeti_add_page:[page name]`

You can add a page to your build, and the plugin will automatically generate the appropriate files, partials and config include lines, to reduce the manualy dependancy.

You can also define whatever pages you want upfront in the Gruntfile.js SASSquatch config. 

## Deleting a page

At the moment this must be done manually. It is a planned feature to allow dynamically removing pages though. For now, just remember to remove the import lines from the config as well as the actual pages.

## Folder and File structure

A page is broken down into multiple files. There is a "master" include file, which has the page name. This file is what is included in the page_includes config file, and it in turn includes the all the page subfiles. These subfiles consist of a separate file for each configured breakpoint.

### Example page folder structure

    pages
        default
            _default.scss
            _base.scss
            _480.scss
            _768.scss
            _960.scss

Within each page breakpoint partial is a mixin that has the name of the page, suffixed with the breakpoint value.

All your code for this breakpoint in this page should be included here.

### page breakpoint example

    // pages/home/_480.scss
    @mixin home_page_480() {
        background:red;
        width:100%;
    }

## Including a page

Each breakpoint will have a mixin that wraps the styles it contains. For example, the default page mixins will be called *default_page_base*, *default_page_480*, *default_page_768* and *default_page_960*.

These get included at the main breakpoint stylesheet level (base and up in the sass folder root), when you are breaking the styles down by page identifier. I have added some examples below:

### including page in main breakpoint file

    //480.scss
    @media only screen and (min-width: 480px) {
       @import "config/imports";
       
       @include construct() {
            // default styles applied as a baseline
            @include default_page_480;
    
            //page-specific styles override
            #home_page {
                @include home_page_480;
            }
       };
    }

