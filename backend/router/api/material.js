const express = require("express");
const db = require("../../database/connection");

const materialRouter = express.Router();

//---------------------------------------------------------------------------------------------------------------------//
// GET COMMANDS FOR MATERIALS  //

materialRouter.get("/materials", async (req, res) => {
	try {
		const material = await db.material.findMany();
		res.json(material);
	} catch (e) {
		res.status(500).send(`error [/api/materials] : ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// POST COMMANDS FOR MATERIALS  //

materialRouter.post("/newMaterial", async (req, res) => {
	try {
		const { material_name, material_desc, material_cost } = req.body;

		const material = await db.material.create({
			data: {
				material_name,
				material_desc,
				material_cost,
			},
		});
		res.json(material);
	} catch (e) {
		res.status(500).send(`error [/api/newmaterial]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// UPDATE COMMANDS FOR MATERIALS //

//** Update method for existing material */

materialRouter.put("/updateMaterial/:material_id", async (req, res) => {
	try {
		const { material_name, material_desc, material_cost } = req.body;
		const materialUp = Number(req.params.material_id);
		const material_update = await db.material.update({
			where: {
				material_id: materialUp,
			},
			data: { material_name, material_desc, material_cost },
		});
		res.json(material_update);
	} catch (e) {
		res.status(500).send(`error [/api/updateMaterial]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
/// DELETE COMMANDS FOR MATERIALS ///

// *** Error FK constraint failed material_id *** //
// *** Would first need to delete the cooresponding supply order line item *** //
// *** May be a constraint on supplier item as well *** //

//** Above issues were fixed by adding Cascade Action to Delete  */
materialRouter.delete("/deleteMaterial/:material_id", async (req, res) => {
	try {
		const materialID = Number(req.params.material_id);
		const deleteMaterial = await db.material.deleteMany({
			where: {
				material_id: materialID,
			},
		});
		res.json(deleteMaterial);
	} catch (e) {
		res.status(500).send(`error [/api/deleteMaterial] ${e}`);
	}
});

module.exports = materialRouter;
