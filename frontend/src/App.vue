<template>
	<div>
		<!-- Nav bar -->
		<nav class="navbar navbar-expand navbar-light bg-light" v-if="!$route.meta.hideNavbar">
			<div class="container">
				<a class="navbar-brand float-left " href="/">Urban Scents</a>
				<ul class="nav navbar-nav mr-auto">
					<li class="nav-item">
						<router-link class="nav-link" to="/events">Events</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/admin">Admin</router-link>
					</li>
				</ul>
			</div>
		</nav>
	</div>
	<!-- Router view -->
	<div class="container mt-6">
		<router-view></router-view>
	</div>
</template>

<script>
import { isLoggedIn } from "./utils/auth";

export default {
	methods: {
		isLoggedIn() {
			return isLoggedIn();
		},
	},
};
</script>

<style></style>
