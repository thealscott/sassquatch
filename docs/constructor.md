# The Constructor

The constructor currently lives in the helpers folder (though I plan to move it, as it isn't really a helper) and it serves a role similar to what a constructor does in backend languages.

Each breakpoint stylesheet starts by including the constructor. In the constructor we should define any and all modules that you want to be universally applied/available. If you don't include them in the constructor, you need to include them manually either in your page styles or in your breakpoint styles.

You can add other things, basically anything you want to be universally applied, regardless of breakpoint, but I would recommend putting these into modules, helpers or configs rather than polluting the constructor.

At the moment, the constructor must be manually managed, but the plan is to make it configurable with the grunt plugin.