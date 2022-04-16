const express = require("express");
const db = require("../../database/connection");

const productsRouter = express.Router();

// Gets all products
// * host.com/api/products
productsRouter.get("/products", async (req, res) => {
	try {
		const products = await db.product.findMany();
		res.json(products);
	} catch (e) {
		res.status(500).send(`error [/api/product/categories] : ${e}`);
	}
});

//* Get individual product
//* host.com/api/products/product_id
productsRouter.get("/products/:product_id", async (req, res) => {
	try {
		const productID = Number(req.params.product_id);
		const prod_id = await db.product.findMany({
			where: { product_id: productID },
		});
		res.json(prod_id);
	} catch (e) {
		res.status(500).send(`error [api/product/productid] : ${e}`);
	}
});

// * Gets a List of all product categories
// * host.com/api/product/categories
productsRouter.get("/product_category", async (req, res) => {
	try {
		const categories = await db.product_category.findMany();
		res.json(categories);
	} catch (e) {
		res.status(500).send(`error [/api/product/categories] : ${e}`);
	}
});

// * Get a list of products by product category id
// * host.com/api/product/categories/:prod_cat
productsRouter.get("/products_by_cat/:product_category", async (req, res) => {
	try {
		const { product_category } = req.params;
		const products =
			await db.$queryRaw`SELECT product.product_id, product.product_name, product.product_category, product.product_desc, product.product_cost, avg(review.review_rating) as review_rating
		FROM product 
		LEFT JOIN review on product.product_id = review.product_id
		WHERE product_category = ${product_category}
		group by product.product_id;`;
		res.json(products);
	} catch (e) {
		console.error(e);
		res.status(500).send(`error [/api/product/category/product_category] : ${e}`);
	}
});

//* get a product by id with all of it's reviews
//* host.com/api/product-reviews/:product_id
productsRouter.get("/product-reviews/:product_id", async (req, res) => {
	try {
		const { product_id } = req.params;
		const product = await db.$queryRaw`select p.product_id, p.product_name, p.product_desc, p.product_cost, r.review_rating, r.review_desc, t.average
  from product p
  left join review r
  on p.product_id = r.product_id
  inner join (
  select avg(review.review_rating) as average
      from review
      where product_id = ${product_id}
  ) as t
  where p.product_id = ${product_id};`;
		res.json(product);
	} catch (e) {
		res.status(500).send(`error [/api/product-reviews/product_id] : ${e}`);
	}
});

/* Report 7 - Best Sellers  --- Need to filter loop to show top 3 from list */
// * host.com/api/bestSellers
productsRouter.get("/bestSellers", async (req, res) => {
	try {
		const bestSellers =
			await db.$queryRaw`SELECT capstone.c_order_line_item.product_id,COUNT(capstone.c_order_line_item.product_id) as Count, capstone.product.product_name, capstone.product.product_desc, capstone.product.product_cost
  FROM capstone.c_order_line_item
  Join capstone.product
  On capstone.c_order_line_item.product_id = capstone.product.product_id
  GROUP BY product_id`;
		res.json(bestSellers);
	} catch (e) {
		res.status(500).send(`error [/api/bestSellers]: ${e}`);
	}
});

/* Report 8 - Worst Sellers --- Need to filter loop to show top 3 from list */
// * host.com/api/worstSellers
productsRouter.get("/worstSellers", async (req, res) => {
	try {
		const worstSellers =
			await db.$queryRaw`SELECT capstone.c_order_line_item.product_id,COUNT(capstone.c_order_line_item.product_id) as Count, capstone.product.product_name, capstone.product.product_desc, capstone.product.product_cost
  FROM capstone.c_order_line_item
  Join capstone.product
  On capstone.c_order_line_item.product_id = capstone.product.product_id
  GROUP BY product_id
  ORDER BY COUNT(capstone.c_order_line_item.product_id) ASC`;
		res.json(worstSellers);
	} catch (e) {
		console.log(e);
		res.status(500).send(`error : ${e}`);
	}
});

//                      POST COMMANDS FOR PRODUCTS          //

//* New Product Specification Post //
//* host.com/api/newProductSpecification
productsRouter.post("/newProductSpecification", async (req, res) => {
	try {
		const { ps_id, product_id, prod_cat_id, product_main } = req.body;
		const productSpecification = await db.product_specification.create({
			data: {
				ps_id,
				product_id,
				prod_cat_id,
				product_main,
			},
		});
		res.json(productSpecification);
	} catch (e) {
		res.status(500).send(`error [/api/newProductSpecification] : ${e}`);
	}
});

//* New product category
//* host.com/api/newProdCategory
productsRouter.post("/newProdCategory", async (req, res) => {
	try {
		const { prod_name } = req.body;

		const prod_cat = await db.product_category.create({
			data: { prod_name },
		});
		res.json(prod_cat);
	} catch (e) {
		res.status(500).send(`error [/api/newProductCategory] : ${e}`);
	}
});

//* New product
//* host.com/api/newProduct
productsRouter.post("/newProduct", async (req, res) => {
	try {
		const { product_name, product_category, product_desc, product_cost } = req.body;
		const products = await db.product.create({
			data: { product_name, product_category, product_desc, product_cost },
		});
		res.json(products);
	} catch (e) {
		res.status(500).send(`error [/api/newProduct] : ${e}`);
	}
});

//* New Product Review
//* host.com/api/newReview
productsRouter.post("/api/newReview", async (req, res) => {
	try {
		const { c_order_id, product_id, review_rating, review_desc } = req.body;

		const review = await db.review.create({
			data: {
				c_order_id,
				product_id,
				review_rating,
				review_desc,
			},
		});
		res.json(review);
	} catch (e) {
		res.status(500).send(`error [/api/newReview] : ${e}`);
	}
});

///               UPDATE ROUTES FOR PRODUCT / PRODUCT CATEGORIES         ///

productsRouter.put("/updateProduct/:product_id", async (req, res) => {
	try {
		const { product_name, product_category, product_desc, product_cost } = req.body;
		const productUp = Number(req.params.product_id);
		const product_update = await db.product.update({
			where: {
				product_id: productUp,
			},
			data: { product_name, product_category, product_desc, product_cost },
		});
		res.json(product_update);
	} catch (e) {
		res.status(500).send(`error [/api/updateProduct]: ${e}`);
	}
});

///               DELETE ROUTES FOR PRODUCT / PRODUCT CATEGORIES         ///

//** Delete an existing product */
//** host.com/api/deleteproduct/:product_id */
productsRouter.delete("/deleteProduct/:product_id", async (req, res) => {
	try {
		const product_del = Number(req.params.product_id);
		const product_delete = await db.product.deleteMany({
			where: {
				product_id: product_del,
			},
		});
		res.json({
			success: true,
			payload: product_delete,
		});
	} catch (e) {
		res.status(500).send(`error [/api/updateProduct]: ${e}`);
	}
});

//** Delete a product category */
//** host.com/api/deletecategory/:prod_cat_id */

productsRouter.delete("/deleteCategory/:prod_cat_id", async (req, res) => {
	try {
		const category_id = Number(req.params.prod_cat_id);
		const cat_delete = await db.product_category.deleteMany({
			where: {
				prod_cat_id: category_id,
			},
		});
		res.json({
			success: true,
			payload: cat_delete,
		});
	} catch (e) {
		res.status(500).send(`error [/api/deleteCategory]: ${e}`);
	}
});
module.exports = productsRouter;
