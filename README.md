SASSquatch
==========

Experiments with a SASS framework/structure

The idea being to achieve two things:

* Make it easy to have a common set of included modular placeholder/classes available at all times
* Make the code easier to manage and keep track of at a page level by splitting things out into more manageable chunks

I had some grander ideas about leveraging SASS to do clever things liek iterate through config lists and include the appropriate files, but sadly, it seems you can't import things from within directives, which scuppers some of that and makes things less clever than I'd like

I wanted to try and use mixins and functions to emulate a kind of OOP style class system, but it hasn't panned out quite like that. 

However, so far, I think there may be some legs in this just from a code organisation perspective. 
