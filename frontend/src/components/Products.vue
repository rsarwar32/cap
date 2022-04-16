<template>
	<div class="card-deck">
		<div v-for="product in Products" :key="product.product_id">
			<div class="card" style="width: 18rem; height: 45rem;">
				<img style="height:50%" class="card-img-top" :src="getImgUrl(product.product_id)" />
				<div class="card-body">
					<h5 style="height:40%" class="card-title">
						{{ product.product_name }}
					</h5>
					<p style="height:20%" class="card-text">{{ product.product_desc }}</p>
					<p style="height:5%">${{ formatPrice(product.product_cost) }}</p>
					<div style="height:5%" v-if="!!product.review_rating">{{ product.review_rating }} stars</div>
					<div style="height:5%" v-else></div>
					<router-link
						:to="{
							name: 'ProductInfo',
							params: {
								product_id: product.product_id,
								cost: product.product_cost,
							},
						}"
					>
						<button type="submit" class="btn btn-danger mt-3" justify-content="center">
							Checkout
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			Products: [],
		};
	},
	// this is using created hook
	created() {
		let apiURL = `http://localhost:3000/api/products_by_cat/${this.$route.params.product_category}`;
		axios
			.get(apiURL)
			.then((res) => {
				this.Products = res.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},
	methods: {
		//https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
		getImgUrl(x) {
			var images = require.context("../assets/", false, /\.png$/);
			return images("./" + x + ".png");
		},
		formatPrice(value) {
			let val = (value / 1).toFixed(2).replace(",", ".");
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
	},
};
</script>
