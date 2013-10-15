# Helpers

SASSquatch is built on top of Compass, so a lot of general utilities are already provided, but you will probably have your own library of mixins and functions you want to use for things like polyfills, prefix-busters and so forth.

By adding them to a helper file, much like in backend frameworks, you can make them globally accessible to be used wherever they are needed.

## Adding a helper

You can include a list of helper files for SASSquatch to generate in the config in your Gruntfile.js. Presently if you want to add new helpers after initial setup, you will need to do it manually, but dynamic helper adding is a planned feature. 

When you add a helper, you must also remember to add it the *_imports.scss* config.

## Deleting a helper

Like adding, this must currently be done manually. Don't forget to remove the import line in the *_imports.scss* config.

## Including a helper

Unlike modules and pages, helpers are not "instantiated", as the mixins and functions in a helper need to be specifically invoked anyway.

Just make sure the helpers are in the *_imports.scss* config. I would say the best place for them is between the configs and the modules.