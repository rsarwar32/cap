// File to allow front end to talk to backend api
import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:3000/api/",
	headers: {
		"Content-type": "application/json",
	},
});
