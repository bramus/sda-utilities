const trackProgress = (animation, cb, precision = 5) => {
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

export default trackProgress;
