import TWEEN from '@tweenjs/tween.js';

export default class TweenPromise extends Promise {
	constructor(tween) {
		super((resolve) => {
			tween.onComplete(resolve);
			tween.onStop(resolve);

			tween.start(TWEEN._time);
		});

		this.tween = tween;
	}
}
