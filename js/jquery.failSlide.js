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

			var currItem = 0;


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

			function chooseNext(order, arr, current){
				var next;
				switch (order){
					case "backward":
						next = function() {
							var i = current - 1;
							if (i < 0) {
								if (options.loop) {
									i = arr.length - 1;
								} else {
									i = 0;
								}
							}
							return i;
						};

						break;
					case "random":
						next = function() {
							// do once
							var i = djsex.array.randomIndex(arr);

							////then keep going if no change in index
							//while (i === current){
							//	i = djsex.array.randomIndex(arr);
							//}
							return i;
						};
						break;

					case "forward":
					default:
						next = function(){
							var i = current + 1;
							if (i > arr.length-1){
								if(options.loop){
									i = 0;
								} else {
									i = arr.length-1;
								}
							}
						return i;
					}
				}


				currItem = next();
				console.log(next());
				return next();
			}

			function fetch_async_image_loader(){

				var $current = $("." + options.container +" > img");
				var $asyncImg = $("<img>");
				var next = chooseNext(options.order,arr,currItem);

				$asyncImg.load(setTransition(options.effect, $current, $asyncImg));

				$asyncImg.attr("src", arr[next].url);


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
