# Modules

Modules are where modular style sets can be kept. These are styles that will be reused across the design, things like buttons, typography rules and so forth. Ideally you define placeholder classes here, that can be "instantiated" by extending them in your main/page styles, attached to semantic classes.  

## Placeholder classes and extending

The idea of modules is to make use of placeholder classes (like %base_button for example) in order to define baseline styles for commonly used elements.

By default, the plugin will add _typography.scss and _buttons.scss and these form good examples of the kind of thing you would use modules for. It's all about highly modular style chunks that can be used and extended from anywhere in the project.

*NOTE: a lot of the inspiration for this approach has been based off this great [OOCSS related article](http://ianstormtaylor.com/oocss-plus-sass-is-the-best-way-to-css/). The idea is to get the benefit of highly modular CSS without having your markup bogged down in class names.*

Using a placeholder class you can define a set of flexible styles that can be reused or extended at any point. For example:

### Example of placeholder class usage

Here are some basic button styles, that will be used on all my buttons.

    %button {
        background:red;
        color:white;
    }    

If I want large button styles I can extend my basic button and make the needed changes.

    %large_button {
        @extend %button;
        font-size:2rem;
    }

By using placeholders with descriptive names, it means we can keep our markup cleaner, and allow us to use class names that reflect function rather than style.

    .submit_button {
        @extend %button;
    }

You can use normal classes in the module directly for things that probably won't vary much (like general link styles etc) or else you can simply extend a placeholder at any point in your page styles.

So, for example, perhaps on my home page I want a sign up button to be unique. It should be like a %large_button but have a blue rather than red background. It's easy to extend my base button placeholders from within my home page styles. 

    @mixin home_page_base() {
        .signup_button {
            @extend %large_button;
            background:blue;
        }
    }

## Adding modules

`grunt sassquatch_add_module:[module name]`

`grunt yeti_add_module:[module name]`

You can define your modules upfront in the Gruntfile.js config, but you can also use the plugin to add new ones when you want, and it will handle file creation and inserting the needed import lines to the config.

## Deleting modules

If you want to delete a module, for now you must do it manually. Remember to remove the appropriate import line from the *_imports_modules.scss* config file. 

## Including a module

If you want a module to be universally available (rather than just to a specific page or breakpoint) you need to include it in the constructor mixin, like so:

    @mixin construct() {
        @include "modules/typography";
        @include "modules/buttons";        
    
        @content;
    }

Otherwise, simply include the module at whatever point you need it to be available. Many modules could happily just be included at the base.scss level, as the styles they apply will cascade. You only need to include the modules where you want to extend them.

