Initially forked fom http://www.github.com/dcdeiv/jsonslider

However after some exploration, our need to load in a large number of images without overloading the DOM with hidden ```<img>``` tags led to a complete rewrite & fresh project

This code has only been tested on recent Chrome. YMMV, however some of the effects are unlikely to work in non-webkit browsers without modification.

The plugin is called with a reference to the json file containing the images and options:

```$( '.slide-show' ).failSlide('store.json')```

All options are controlled in the json file:

```
{
  "pictures"  : [...],
  "options"	: {
	"container"	: "slide-show", //your container class 
	"effect"	: "none", // "fade"
	"duration"	: 5000, //in ms
	"loop"	: true,   // false
	"order" : "forward" // "backward", "random"
  }
}
```
