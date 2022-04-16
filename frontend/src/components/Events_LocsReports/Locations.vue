<template>
	<div>
		<h2 align="center">Locations</h2>
		<br />
		<div class="row">
			<div class="col-md-12">
				<table class="table table-striped">
					<thead class="thead-dark">
						<tr>
							<th>Location Name</th>
							<th>Location Address</th>
							<th>Location Addr 2</th>
							<th>City</th>
							<th>State</th>
							<th>Zip</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x.location_id">
							<td>{{ x.location_name }}</td>
							<td>{{ x.location_address }}</td>
							<td>{{ x.location_city }}</td>
							<td>{{ x.location_state }}</td>
							<td>{{ x.location_zip }}</td>
							<td>
								<button @click.prevent="deleteEvents(x.location_id)" class="btn btn-danger mx-2">Delete</button>
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
		let apiURL = `http://localhost:3000/api/locations`;
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
		deleteEvents(id) {
			let apiURL = `http://localhost:3000/api/locationDelete/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.event_id === id);
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
