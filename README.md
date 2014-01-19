# ConDict - Simple Dictionary App

ConDict is a simple dictionary app that was initially slapped together in a 4-hour hackathon before leaving on a family Christmas trip, and was cleaned up to a degree upon return.  I use it as an aid in my secret vice of language construction, although as built it's not all tha flexible, supporting only the dictionary it was compiled with, and is read-only.

## Skeleton

This was made starting with the Brunch with Moby skeleton, gh:connorblack/brunch-with-moby.  I'm not sure how I feel about having both QuoJS and jQuery at the same time.  Maybe next time I should just switch to MonocleJS if I want to do anything with Quo.

## Considerations for next time

* If a vendor lib's source is in CoffeeScript and Stylus or SASS/SCSS, then import that rather than leaving them as the precompiled JS and CSS.  Easier to debug.
* Don't try to use anything with Backbone but jQuery or Zepto. (Or whatever else they mention on their site.)  Although the fixes to Backbone to make it play nice with (an old version of!) QuoJS weren't that bad, that's a good few hours lost to something silly.
* Dropbox integration using the Dropbox app sync thingy plugin so that ConDict has its own folder in the main Dropbox folder to make it easy to upload and download dictionaries.
* GitHub integration...?
* Use Sencha Touch or Zepto/Backbone.
* For Zepto/Backbone, don't feel that the templates to be in the class file.  Precompiled handlebars templates are fine.  Just because CoffeeScript has multiline strings...