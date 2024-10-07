export const enterAnimation = {
	initial: { opacity: 0, y: -30, scale: 0.8 },
	whileInView: { opacity: 1, y: 0, scale: 1 },
	transition: { duration: 0.6 },
	viewport: { once: true },
};

export const enterAnimationFast = {
	initial: { opacity: 0, y: -30, scale: 0.8 },
	whileInView: { opacity: 1, y: 0, scale: 1 },
	transition: { duration: 0.4 },
	viewport: { once: true },
};

export const fadeInAnimation = {
	initial: { opacity: 0 },
	whileInView: { opacity: 1 },
	transition: { duration: 0.5 },
	viewport: { once: true },
};
