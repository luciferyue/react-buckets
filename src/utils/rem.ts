const computerHTMLFontSize = (): void => {
	const docEl = document.documentElement;
	let clientWidth = window.outerWidth || window.innerWidth || 375;

	if (clientWidth < 320) {
		clientWidth = 320;
	} else if (clientWidth > 500) {
		clientWidth = 500;
	}

	docEl.style.fontSize = `${10 * (clientWidth / 375)}px`;
};

window.onresize = computerHTMLFontSize;

computerHTMLFontSize();