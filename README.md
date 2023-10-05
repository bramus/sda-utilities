# Scroll-Driven Animations Utilities

Collection of utility functions for use with Scroll-Driven Animations

## Installation

```bash
npm i @bramus/sda-utilities
```

## The Utilities

### `runOnce` – Run Scroll-Driven Animation only once

Example: run the `fade-in` animation on the `.hero` element only once.

```js
import { runOnce } from '@bramus/sda-utilities';

window.addEventListener('load', (e) => {
	const $hero = document.querySelector('#hero');
	runOnce($hero, 'fade-in');
});
```

### `trackProgress` – Sync the progress of an effect to something external

Example: output the animation progress as text on the page.

```js
import { trackProgress } from '@bramus/sda-utilities';

window.addEventListener('load', (e) => {
	trackProgress(document.querySelector('.animation-subject').getAnimations()[0], (progress) => {
		document.querySelector('.animation-subject').innerText = `${(progress * 100).toFixed(5)}%`;
	});
});
```

## Demos

Demos are included in this repository. Run `npm run dev` and visit `http://127.0.0.1:8000/` to see the demos.

```bash
npm run dev
```

## License

`@bramus/sda-utilities` is released under the MIT public license. See the enclosed `LICENSE` for details.
