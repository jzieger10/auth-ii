require("dotenv").config();
const jwt = require("jsonwebtoken");

const middleware = {
	protected: (req, res, next) => {
		const token = req.headers.authorization;
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err) {
					res.status(401).json({ message: "Invalid token provided" });
				} else {
					req.decodedToken = decodedToken;
					next();
				}
			});
		} else {
			res.status(401).json({ message: "No token provided" });
		}
	},

	generateToken: user => {
		const payload = {
			username: user.username,
			department: user.department,
		};

		const secret = process.env.JWT_SECRET;

		const options = {
			expiresIn: "120m",
		};

		return jwt.sign(payload, secret, options);
	},
};

module.exports = middleware;
