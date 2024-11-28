const trackProgressThroughEffect = (animation, cb, precision) => {
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

// Note: once we have a `progress` event on an Animation, we can drop the rAF
const trackProgressThroughAnimation = (animation, cb, precision) => {
	let progress = null;

	const updateValue = () => {
		if (animation && animation.currentTime) {
			let newProgress = animation.overallProgress.toFixed(precision);

			if (newProgress != progress) {
				progress = newProgress;
				cb(progress);
			}
		}
		requestAnimationFrame(updateValue);
	};

	requestAnimationFrame(updateValue);
};

const trackProgress = (animation, cb, precision = 5) => {
	if (("Animation" in globalThis && "overallProgress" in Animation.prototype)) {
		trackProgressThroughAnimation(animation, cb, precision);
	} else {
		trackProgressThroughEffect(animation, cb, precision);
	}
};

export default trackProgress;
