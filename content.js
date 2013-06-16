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

	var $slider = $("#rail-resize-vert"),
		sliderPos = $slider.position();
	var sliderChanged = function (cb) {
		var pos = $slider.position();
		if (pos.left != sliderPos.left) {
			cb();
		}
		sliderPos = pos;

		loopFunctions.push(function () {
			sliderChanged(cb);
		});
	};

	var $parent = $("#inboxcontainer"),
		$list = $parent.find("#msg-list"),
		$preview = $parent.find(".messagepane");

	var sliderChangedCb = function () {
		console.log("slider changed");

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

