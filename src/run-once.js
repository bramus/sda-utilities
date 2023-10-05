// Run a Scroll-Driven Animation only once
// This relies on:
// - An animation of a given name to be applied only once onto an element.
// - The `animation-fill-mode` being set to `forwards` or `both` in case the end frame is not the default styling.
const runOnce = ($el, animationName = null) => {
	const animations = $el.getAnimations();

	const shouldAnimationBeStopped = (animation, animationName = null) => {
		if (!(animation.timeline instanceof ScrollTimeline)) return false;

		if (animationName === null) {
			return true;
		}

		return animation.animationName === animationName;
	};

	$el.addEventListener('animationend', (e) => {
		// animationend is also triggered when back at the start. Ignore those.
		if (e.elapsedTime == 0) return;

		// Extract animation
		// Could get the wrong one though, see https://github.com/w3c/csswg-drafts/issues/9010 for details
		const animation = animations.find((a) => a.animationName == e.animationName);

		// Only process if the animation name matches
		if (shouldAnimationBeStopped(animation, animationName)) {
			// Give a warning when the fill mode is not the correct one
			if (!['forwards', 'both'].includes(animation.effect.getComputedTiming().fill)) {
				console.warn(`The fillMode for the animation “${animationName}” is not set to \`forwards\`. This can cause a glitch when removing the animation.`);
			}

			// Commit the styles and remove the animation
			animation.commitStyles();
			animation.cancel();
		}
	});
};

export default runOnce;
