const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);
const bcrypt = require("bcryptjs");
const middleware = require("../middleware/middleware.js");
const protected = middleware.protected;
const generateToken = middleware.generateToken;

router.route("/api/register").post((req, res) => {
	const userInfo = req.body;

	userInfo.password = bcrypt.hashSync(userInfo.password, 10);

	db("users")
		.insert(userInfo)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err =>
			res.status(500).json({
				err,
				message:
					"There has been an error on the Register POST endpoint",
			})
		);
});

router.route("/api/login").post((req, res) => {
	const userInfo = req.body;

	db("users")
		.where({ username: userInfo.username })
		.first()
		.then(user => {
			console.log(userInfo, user.password);
			if (user && bcrypt.compareSync(userInfo.password, user.password)) {
				const token = generateToken(user);

				res.status(200).json({
					message: user.username,
					token: token,
				});
			} else {
				res.status(401).json({
					message:
						"You shall not pass! Incorrect username and/or password.",
				});
			}
		})
		.catch(err =>
			res.status(500).json({
				err,
				message: "There has been an error on the Login POST endpoint",
			})
		);
});

// router.route("/api/logout").get((req, res) => {
// 	if (req.session) {
// 		req.session.destroy(err => {
// 			if (err) {
// 				res.send("Error logging out, please try again");
// 			} else {
// 				res.send("You've been logged out");
// 			}
// 		});
// 	}
// });

router.route("/api/users").get(protected, (req, res) => {
	console.log(req.session);

	// if (user && bcrypt.compareSync(userInfo.password, user.password)) {
	db("users")
		.select("id", "username", "departments")
		.where("departments", "Sales")
		.then(users => {
			res.json({ users });
		})
		.catch(err =>
			res.status(500).json({
				err,
				message: "There has been an error on the Users GET endpoint",
			})
		);
});

module.exports = router;
