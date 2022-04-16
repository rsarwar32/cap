const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../../database/connection");

const authRouter = express.Router();

/**
 * helper funcs
 */

// generate token
function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

// authorize user middleware
function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err);
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

/**
 * ROUTES
 */

authRouter.post("/api/login", (req, res) => {
	// Authenticate User
	const username = req.body.username;
	const password = req.body.password;
	const token = { name: username };

	if (password == "password" && username == "admin") {
		const accessToken = generateAccessToken(token);
		const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
		refreshTokens.push(refreshToken);
		res.json({ accessToken: accessToken, refreshToken: refreshToken });
	}
});

// for refresh tokens
authRouter.post("/api/token", (req, res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) {
		return res.sendStatus(401);
	}
	if (!refreshTokens.includes(refreshToken)) {
		return res.sendStatus(403);
	}
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		const accessToken = generateAccessToken({ name: user.name });
		res.json({ accessToken: accessToken });
	});
});

authRouter.delete("/api/logout", (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.sendStatus(204);
});

module.exports = authRouter;
