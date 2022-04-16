const express = require("express");
const db = require("../../database/connection");

const locationsRouter = express.Router();

//---------------------------------------------------------------------------------------------------------------------//
// GET COMMANDS FOR LOCATION //

// Get all locations for creating a new event
// * host.com/api/locations
locationsRouter.get("/locations", async (req, res) => {
	try {
		const locations = await db.location.findMany();
		res.json(locations);
	} catch (e) {
		res.status(500).send(`error [/api/locations] : ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// POST COMMANDS FOR LOCATION //

// Adding a new location //
// * host.com/newLocation //

locationsRouter.post("/newLocation", async (req, res) => {
	try {
		const { location_name, location_address, location_address_two, location_city, location_state, location_zip } = req.body;
		const location = await db.location.create({
			data: { location_name, location_address, location_address_two, location_city, location_state, location_zip },
		});
		res.json({ location });
	} catch (e) {
		res.status(500).send(`error [/api/newLocation]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// UPDATE COMMANDS FOR LOCATION  //

//** Update Command for Location */

locationsRouter.put("/updateLocation/:location_id", async (req, res) => {
	try {
		const { location_name, location_address, location_address_two, location_city, location_state, location_zip } = req.body;
		const locationID = Number(req.params.location_id);
		const location = await db.location.update({
			where: {
				location_id: locationID,
			},

			data: { location_name, location_address, location_address_two, location_city, location_state, location_zip },
		});
		res.json(location);
	} catch (e) {
		res.status(500).send(`error [/api/updateLocation]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// DELETE COMMANDS FOR LOCATION //

//** Deleting a location */

locationsRouter.delete("/deleteLocation/:location_id", async (req, res) => {
	try {
		const locationID = Number(req.params.location_id);
		const location = await db.location.deleteMany({
			where: {
				location_id: locationID,
			},
		});
		res.json(location);
	} catch (e) {
		res.status(500).send(`error [/api/deleteLocation] ${e}`);
	}
});

module.exports = locationsRouter;
