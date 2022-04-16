const path = require("path");
const express = require("express");
const cors = require("cors");
const apiRouter = require("./router/api");
const app = express();

// Setup static files to serve our built Vue app
const staticFilesPath = path.resolve(__dirname, "../frontend/dist");
const staticFiles = express.static(staticFilesPath);

app.use(staticFiles);

app.use(express.json());
app.use(cors());
app.use(apiRouter);

// LOGIN AUTHENTICATION PROTECTED ROUTES
const jwt = require("jsonwebtoken");
let refreshTokens = [];

app.post("/api/token", (req, res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		const accessToken = generateAccessToken({ name: user.name });
		res.json({ accessToken: accessToken });
	});
});

app.delete("/api/logout", (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.sendStatus(204);
});

app.post("/api/login", (req, res) => {
	// Authenticate User

	const username = req.body.username;
	const password = req.body.password;
	const user = { name: username };
	if (password == "password" && username == "admin") {
		const accessToken = generateAccessToken(user);
		const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
		refreshTokens.push(refreshToken);
		res.json({ accessToken: accessToken, refreshToken: refreshToken });
	} else {
		throw "Incorrect username/password";
	}
});

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

// eslint-disable-next-line no-unused-vars
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

// Get all possible product categories for the home page

// To serve our frontend
app.get(/.*/, (_req, res) => {
	const p = path.resolve(__dirname, "../frontend/dist/index.html");
	res.sendFile(p);
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
