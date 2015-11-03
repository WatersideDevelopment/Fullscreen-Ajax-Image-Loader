//Fullscreen Ajax Image Loader
//http://www.github.com/....
// MIT://

(function($) {
	$.fn.failSlide = function(store) {


		$.getJSON(store, function(data) {
			var arr = $.map(data, function(el) {
					return el;
				});

			var items = arr.length-1;

			function fetch_async_image_loader(){
				//console.log("running");

				var $current = $(".slide-show > img");
				var $asyncImg = $("<img>");

				$asyncImg.load(function(){
					$current.fadeOut(1000, function(){
						$current.attr("src", $asyncImg.attr("src"));
					} ).fadeIn(1000);
				});

				$asyncImg.attr("src", arr[items].url);
				items --;
				if (items < 0){
					items = arr.length -1
				}
			}

			setTimeout(setInterval(function() {
				fetch_async_image_loader();
			}, 4000), 5000);

		});
	};
})(jQuery);
