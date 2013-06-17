console.log("nauiovnioawmncioawmo YEAAAAHHHHHHHHH");

$(document).ready(function () {
	var loopFunctions = [];
	var loop = function () {
		var currentLoopFunctions = loopFunctions.slice();
		for (var i =0; i<currentLoopFunctions.length; i++) {
			currentLoopFunctions[i]();
		}
		loopFunctions.splice(0, currentLoopFunctions.length);
		setTimeout(loop, 50);
	};
	loop();

	var $slider, sliderPos;
	var initSlider = function () {
		$slider = $("#rail-resize");
		sliderPos = $slider.position();
	};
	initSlider();
	var sliderChanged = function (cb) {
		var pos = $slider.position();

		if ($slider.length > 0 && pos) {
			if (pos.left != sliderPos.left) {
				cb();
			}
			sliderPos = pos;
		} else {
			initSlider();
		}
		loopFunctions.push(function () {
			sliderChanged(cb);
		});
	};

	var $parent = $("#inboxcontainer"),
		$list = $parent.find("#msg-list"),
		$preview = $parent.find(".messagepane");

	var sliderChangedCb = function () {
		console.log("slider changed");

		if (!sliderPos) {
			return false;
		}
		var left = sliderPos.left;
		$preview.css({
			marginLeft: -left, // getit back to 0, i can't mess with left because they're setting that.
			width: left
		});

		$list.css({
			maxWidth: $parent.width() - left,
			minWidth: $parent.width() - left
		});

	};
	sliderChanged( sliderChangedCb );
	sliderChangedCb();


});

