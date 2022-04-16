<template>
	<div>
		<h2 align="center">Suppliers Orders</h2>
		<br />
		<div class="container-fluid">
			<div class="row">
				<div class="table-wrapper table-earnings">
					<table class="table table-striped table-bordered">
						<thead class="thead-dark">
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Total number of orders placed</th>
								<th>Total amount spent</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="x in rows" :key="x.supplier_id">
								<td>{{ x.supplier_id }}</td>
								<td>{{ x.supplier_name }}</td>
								<td>{{ x.count }}</td>
								<td>${{ formatPrice(x.total) }}</td>
								<td>
									<router-link :to="{ name: 'Home', params: { id: x.customer_id } }" class="btn btn-info is-small">Edit</router-link>
									<a class="btn btn-danger is-small " @click.prevent="deleteCustomer(x.customer_id)">Delete</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<br />
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<button class="btn btn-primary me-md-2" type="button">Add New Customer</button>
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
		let apiURL = `http://localhost:3000/api/suppliersAndOrders`;
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
		formatPrice(value) {
			let val = (value / 1).toFixed(2).replace(",", ".");
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
	},
};
</script>
<!--https://stackoverflow.com/questions/40499855/bootstrap-table-vertical-scroll-->
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
