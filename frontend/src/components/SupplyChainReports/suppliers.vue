<template>
	<div>
		<h2 align="center">Suppliers</h2>
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings data-sticky-header">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Address</th>
							<th scope="col">Addr Cont</th>
							<th scope="col">City</th>
							<th scope="col">State</th>
							<th scope="col">Zip</th>
							<th scope="col" width="170px">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x.supplier_id">
							<td>{{ x.supplier_name }}</td>
							<td>{{ x.supplier_address }}</td>
							<td>{{ x.supplier_address_two }}</td>
							<td>{{ x.supplier_city }}</td>
							<td>{{ x.supplier_state }}</td>
							<td>{{ x.supplier_zip }}</td>
							<td>
								<router-link :to="{ name: 'Home', params: { id: x.supplier_id } }" class="btn btn-info is-small">Edit</router-link>
								<a class="btn btn-danger is-small " @click.prevent="deleteCustomer(x.customer_id)">Delete</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<br />
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<button class="btn btn-primary me-md-2" type="button">Add New Supplier</button>
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
		let apiURL = `http://localhost:3000/api/suppliers`;
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
		deleteSupplier(id) {
			let apiURL = `http://localhost:3000/api/deleteSupplier/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.supplier_id === id);
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
<style scoped>
.table-wrapper {
	max-height: 500px;
	overflow: auto;
	display: inline-flex;
}
.table-earnings {
	background: #f3f5f6;
}

th {
	position: sticky;
	top: 0px;
	background: #f3f5f6;
}
.btn {
	margin-right: 3px;
}
</style>
