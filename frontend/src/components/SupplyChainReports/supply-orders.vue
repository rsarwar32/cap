<template>
	<div>
		<br />
		<h2 align="center">Supply Orders</h2>
		<br />
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Date</th>
							<th scope="col">Payment Method</th>
							<th scope="col">Material</th>
							<th scope="col">Supplier</th>
							<th scope="col" width="150">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x">
							<td>{{ x.so_id }}</td>
							<td>{{ formatDate(x.so_date) }}</td>
							<td>{{ x.so_payment_methods }}</td>
							<td>{{ x.material_name }}</td>
							<td>{{ x.supplier_name }}</td>
							<td>
								<a class="btn btn-danger is-small " @click.prevent="deleteCustomer(x.customer_id)">Delete</a>
								<router-link :to="{ name: 'Home', params: { id: x.customer_id } }" class="btn btn-info is-small">Edit</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<br />
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<button class="btn btn-primary me-md-2" type="button">Add New Supply Order</button>
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
		let apiURL = `http://localhost:3000/api/supplyOrder`;
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
		//date formatting is needed to make readable
		formatDate(date) {
			let protoDate = new Date(date);
			//return moment(date).format("MMMM DD YYYY")
			return protoDate.toDateString();
		},
	},
};
</script>
<style scoped>
.table-wrapper {
	max-height: 600px;
	overflow: auto;
	display: inline-block;
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
