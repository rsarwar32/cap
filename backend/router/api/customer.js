const express = require("express");

const db = require("../../database/connection");

const customerRouter = express.Router();

//---------------------------------------------------------------------------------------------------------------------//
// GET COMMANDS FOR SUPPLIERS - SUPPLY_ORDER  //

// List of all customers
// host.com/api/customer
customerRouter.get("/customer", async (req, res) => {
	try {
		const customers = await db.customer.findMany();
		res.json(customers);
	} catch (e) {
		res.status(500).send(`error [/api/customer] : ${e}`);
	}
});

// Specific customer by customer ID
// host.com/api/customer/:customer_id
customerRouter.get("/customer/:customer_id", async (req, res) => {
	try {
		const customerId = Number(req.params.customer_id);
		const customers = await db.customer.findUnique({
			where: { customer_id: customerId },
		});
		res.json(customers);
	} catch (e) {
		res.status(500).send(`error [/api/customer/id] : ${e}`);
	}
});

// *  Report 4 - Customer's who have purchased 1 order * //
// * host.com/api/customerPurchases * //
customerRouter.get("/customerPurchases", async (req, res) => {
	try {
		const c_purch = await db.customer.findMany({
			where: { c_order: { some: {} } },
			distinct: ["customer_f_name", "customer_l_name", "customer_email", "customer_id"],
			select: {
				customer_f_name: true,
				customer_l_name: true,
				customer_email: true,
				customer_id: true,
			},
		});
		res.json(c_purch);
	} catch (e) {
		res.status(500).send(`error [/api/customer/purch] : ${e}`);
	}
});

// * host.com/api/customerVisits
customerRouter.get("/customerVisits", async (req, res) => {
	try {
		const customerVisits = await db.$queryRaw`select distinct customer_f_name, customer_l_name, customer_email, customer_point_total
  from capstone.customer
  join capstone.c_order
  on capstone.customer.customer_id = capstone.c_order.customer_id`;
		res.json(customerVisits);
	} catch (e) {
		res.status(500).send(`error [/api/customerVisits] : ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// POST COMMANDS FOR SUPPLIERS - SUPPLY_ORDER  //

customerRouter.post("/addCustomer", async (req, res) => {
	try {
		const {
			customer_f_name,
			customer_l_name,
			customer_ship_address,
			customer_ship_address_two,
			customer_ship_city,
			customer_ship_state,
			customer_ship_zip,
			customer_bill_address,
			customer_bill_address_two,
			customer_bill_city,
			customer_bill_state,
			customer_bill_zip,
			customer_email,
			customer_point_total,
		} = req.body;

		const newCustomer = await db.customer.create({
			data: {
				customer_f_name,
				customer_l_name,
				customer_ship_address,
				customer_ship_address_two,
				customer_ship_city,
				customer_ship_state,
				customer_ship_zip,
				customer_bill_address,
				customer_bill_address_two,
				customer_bill_city,
				customer_bill_state,
				customer_bill_zip,
				customer_email,
				customer_point_total,
			},
		});
		res.json(newCustomer);
	} catch (e) {
		res.status(500).send(`error [/api/addCustomer]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// UPDATE COMMANDS FOR SUPPLIERS - SUPPLY_ORDER  //

//---------------------------------------------------------------------------------------------------------------------//
// DELETE COMMANDS FOR CUSTOMERS //

customerRouter.delete("/deleteCustomer/:customer_id", async (req, res) => {
	try {
		const customerID = Number(req.params.customer_id);
		const deleteCustomer = await db.customer.deleteMany({
			where: {
				customer_id: customerID,
			},
		});
		res.json(deleteCustomer);
	} catch (e) {
		res.status(500).send(`error [/api/deleteCustomer] ${e}`);
	}
});

module.exports = customerRouter;
