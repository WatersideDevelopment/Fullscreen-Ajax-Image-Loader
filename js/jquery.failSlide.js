//Fullscreen Ajax Image Loader
//https://github.com/WatersideDevelopment/Fullscreen-Ajax-Image-Loader
//License: https://opensource.org/licenses/MIT


(function($) {
	$.fn.failSlide = function(store) {

		console.log('hello');
		$.getJSON(store, function(data) {

			var arr = $.map(data.pictures, function(el) {
					return el;
				});

			var options = data.options;

			var items = arr.length-1;
			console.log(items);

			function setTransition(option, current, async){
				var transition = null;
				switch (option) {
					case "none":
						transition = function(){
							current.attr("src", async.attr("src"));
						};
						break;
					case "fade":
						transition = function (){
							current.fadeOut(1000, function(){
								current.attr("src", async.attr("src"));
							} ).fadeIn(1000);
						};
						break;
					default:
						transition = function(){
							current.attr("src", async.attr("src"));
						};
						break;
				}

				return transition;
			}

			function fetch_async_image_loader(){
				console.log(items);

				var $current = $("." + options.container +" > img");
				var $asyncImg = $("<img>");

				$asyncImg.load(setTransition(options.effect, $current, $asyncImg));

				$asyncImg.attr("src", arr[items].url);
				items --;

				if (options.loop){
					if (items < 0){
						items = arr.length -1
					}
				} else {
					if (items < 0){
						items = 0;
					}
				}
			}

			//run once to get first image loaded asap
			fetch_async_image_loader();

			//setTimeout to delay the second image coming in
			//setInterval to keep the loop going
			setTimeout(setInterval(function() {
				fetch_async_image_loader();
			}, options.duration), options.duration);

		});
	};
})(jQuery);
