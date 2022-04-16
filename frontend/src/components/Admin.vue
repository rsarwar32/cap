<template>
	<div class="row">
		<div class="row">
			<!-- Example single danger button -->
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<a class="navbar-brand" href="/Admin">Admin Home</a>
					<div class="dropdown">
						<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
							Customer Reports
						</a>

						<ul class="dropdown-menu" aria-labelledby="CustomerReports">
							<li><a class="dropdown-item" href="/reports/all-customers">All Customers</a></li>
							<li><a class="dropdown-item" href="/reports/customer-purchases">Customer Purchases</a></li>
							<li><a class="dropdown-item" href="/reports/customer-visits">Customer-Visits</a></li>
						</ul>
					</div>
					<div class="dropdown">
						<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
							Supply Chain - Materials - Suppliers
						</a>

						<ul class="dropdown-menu" aria-labelledby="Supply">
							<li><a class="dropdown-item" href="/reports/supply-orders">Supply Orders</a></li>
							<li><a class="dropdown-item" href="/reports/suppliers"> Suppliers</a></li>
							<li><a class="dropdown-item" href="/reports/materials">Materials</a></li>
						</ul>
					</div>
					<div class="dropdown">
						<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
							Events and Locations
						</a>

						<ul class="dropdown-menu" aria-labelledby="dropdownMenuLink3">
							<li><a class="dropdown-item" href="/reports/events">All Events</a></li>
							<li><a class="dropdown-item" href="/reports/locations">All Locations</a></li>
							<li><a class="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</div>
					<div class="dropdown">
						<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
							Products
						</a>

						<ul class="dropdown-menu" aria-labelledby="dropdownMenuLink4">
							<li><a class="dropdown-item" href="/reports/all-products">Products</a></li>
							<li><a class="dropdown-item" href="#">Best Sellers</a></li>
							<li><a class="dropdown-item" href="#">Worst Sellers</a></li>
						</ul>
					</div>
					<a class="btn btn-danger is-small" @click.prevent="logout()">Log Out</a>
				</div>
			</nav>
		</div>

		<div class="row">
			<br /><br />
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { logoutUser } from "../utils/auth";
export default {
	name: "report",
	methods: {
		logout() {
			logoutUser();
			this.$router.push("home");
		},
	},
};
</script>
