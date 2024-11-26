const trackProgressUsingRAF = (animation, cb, precision) => {
	let progress = null;

	const updateValue = () => {
		if (animation && animation.currentTime) {
			let newProgress = animation.effect.getComputedTiming().progress * 1;
			if (animation.playState === 'finished') newProgress = 1;
			newProgress = Math.max(0.0, Math.min(1.0, newProgress)).toFixed(precision);

			if (newProgress != progress) {
				progress = newProgress;
				cb(progress);
			}
		}
		requestAnimationFrame(updateValue);
	};

	requestAnimationFrame(updateValue);
};

const trackProgressUsingBuiltIn = (animation, cb, precision) => {
	const $scroller = animation.timeline.source == document.documentElement ? document : animation.timeline.source;
	$scroller.addEventListener('scroll', (e) => {
		cb(animation.overallProgress.toFixed(precision));
	});

	cb(animation.overallProgress.toFixed(precision));
};

const trackProgress = (animation, cb, precision = 5) => {
	if (!("Animation" in globalThis && "overallProgress" in Animation.prototype)) {
		trackProgressUsingRAF(animation, cb, precision);
	} else {
		trackProgressUsingBuiltIn(animation, cb, precision);
	}
};

export default trackProgress;
