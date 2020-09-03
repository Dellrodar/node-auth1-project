function restrict() {
	// storing error message as were using it multiple times
	const authError = {
		message: 'Invalid credentials',
	};

	return async (req, res, next) => {
		try {
			if (!req.session || !req.session.user) {
				return res.status(401).json(authError);
			}
			next();
		} catch (err) {
			next(err);
		}
	};
}

module.exports = {
	restrict
};
