<template>
	<div>
		<h2 align="center">Products</h2>
		<br />
		<div class="row">
			<div class="col-md-12">
				<table class="table table-striped">
					<thead class="thead-dark">
						<tr>
							<th>Product Name</th>
							<th>Product Desc</th>
							<th>Product Cost</th>
							<th>Product Image</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x">
							<td>{{ x.product_name }}</td>
							<td>{{ x.product_desc }}</td>
							<td>{{ x.product_cost }}</td>
							<td>{{ x.product_image }}</td>

							<td>
								<button @click.prevent="deleteProducts(x.product_id)" class="btn btn-danger mx-2">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			rows: [],
		};
	},
	// this is using created hook
	created() {
		let apiURL = `http://localhost:3000/api/products`;
		axios
			.get(apiURL)
			.then((res) => {
				this.rows = res.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},
	methods: {
		deleteProducts(id) {
			let apiURL = `http://localhost:3000/api/productDelete/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.product_id === id);
			if (window.confirm("Do you really want to delete?")) {
				axios
					.delete(apiURL)
					.then(() => {
						this.rows.splice(indexOfArrayItem, 1);
						// this.forceRerender()
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
	},
};
</script>
