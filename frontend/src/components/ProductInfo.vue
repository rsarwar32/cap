<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<img :src="getImgUrl()" /><br />
				<b>{{ product[0].product_name }}</b
				><br /><br />
				{{ product[0].product_desc }}<br /><br />
				${{ formatPrice(product[0].product_cost) }}<br /><br />
				{{ product[0].averager }}
			</div>

			<div v-show="!!product[0].review_rating" class="col">
				<div class="row">
					<div class="col-md-12">
						<table class="table table-striped">
							<thead class="thead-dark">
								<tr>
									<th>Rating</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="x in product" :key="x.review_id">
									<td>{{ x.review_rating }} stars</td>
									<td>{{ x.review_desc }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<form @submit.prevent="handleSubmitForm">
			<div class="row">
				<div class="col md-4">
					<div class="form-group">
						<label>Quantity</label>
						<input type="number" min="1" class="form-control" v-model="info.qty" required />
					</div>
					<br />

					<div class="form-group">
						<label>First Name</label>
						<input type="text" class="form-control" v-model="info.customer_f_name" required />
					</div>
					<br />

					<div class="form-group">
						<label>Last Name</label>
						<input type="text" class="form-control" v-model="info.customer_l_name" required />
					</div>
					<br />

					<div class="form-group">
						<label>Email</label>
						<input type="text" class="form-control" v-model="info.customer_email" required />
					</div>
					<br />
				</div>
			</div>

			<div class="row">
				<div class="col">
					<h3 class="text-center">Billing</h3>

					<div class="form-group">
						<label>Address Line 1</label>
						<input type="text" class="form-control" v-model="info.customer_bill_address" required />
					</div>
					<br />

					<div class="form-group">
						<label>Address Line 2</label>
						<input type="text" class="form-control" v-model="info.customer_bill_address_two" />
					</div>
					<br />

					<div class="form-group">
						<label>City</label>
						<input type="text" class="form-control" v-model="info.customer_bill_city" required />
					</div>
					<br />

					<div class="form-group">
						<label>State</label>
						<div class="col-sm-10">
							<select class="form-control" id="customer_bill_state" name="customer_bill_state" v-model="info.customer_bill_state">
								<option value="AK">Alaska</option>
								<option value="AL">Alabama</option>
								<option value="AR">Arkansas</option>
								<option value="AZ">Arizona</option>
								<option value="CA">California</option>
								<option value="CO">Colorado</option>
								<option value="CT">Connecticut</option>
								<option value="DC">District of Columbia</option>
								<option value="DE">Delaware</option>
								<option value="FL">Florida</option>
								<option value="GA">Georgia</option>
								<option value="HI">Hawaii</option>
								<option value="IA">Iowa</option>
								<option value="ID">Idaho</option>
								<option value="IL">Illinois</option>
								<option value="IN">Indiana</option>
								<option value="KS">Kansas</option>
								<option value="KY">Kentucky</option>
								<option value="LA">Louisiana</option>
								<option value="MA">Massachusetts</option>
								<option value="MD">Maryland</option>
								<option value="ME">Maine</option>
								<option value="MI">Michigan</option>
								<option value="MN">Minnesota</option>
								<option value="MO">Missouri</option>
								<option value="MS">Mississippi</option>
								<option value="MT">Montana</option>
								<option value="NC">North Carolina</option>
								<option value="ND">North Dakota</option>
								<option value="NE">Nebraska</option>
								<option value="NH">New Hampshire</option>
								<option value="NJ">New Jersey</option>
								<option value="NM">New Mexico</option>
								<option value="NV">Nevada</option>
								<option value="NY">New York</option>
								<option value="OH">Ohio</option>
								<option value="OK">Oklahoma</option>
								<option value="OR">Oregon</option>
								<option value="PA">Pennsylvania</option>
								<option value="PR">Puerto Rico</option>
								<option value="RI">Rhode Island</option>
								<option value="SC">South Carolina</option>
								<option value="SD">South Dakota</option>
								<option value="TN">Tennessee</option>
								<option value="TX">Texas</option>
								<option value="UT">Utah</option>
								<option value="VA">Virginia</option>
								<option value="VT">Vermont</option>
								<option value="WA">Washington</option>
								<option value="WI">Wisconsin</option>
								<option value="WV">West Virginia</option>
								<option value="WY">Wyoming</option>
							</select>
						</div>
					</div>
					<br />

					<div class="form-group">
						<label>Zip Code</label>
						<input type="text" class="form-control" v-model="info.customer_bill_zip" required />
					</div>
					<br />
				</div>

				<div class="col">
					<h3 class="text-center">Shipping</h3>

					<div class="form-group">
						<label>Same as Billing</label>
						<input type="checkbox" class="form-check-input" />
					</div>
					<br />

					<div class="form-group">
						<label>Address Line 1</label>
						<input type="text" class="form-control" v-model="info.customer_ship_address" />
					</div>
					<br />

					<div class="form-group">
						<label>Address Line 2</label>
						<input type="text" class="form-control" v-model="info.customer_ship_address_two" />
					</div>
					<br />

					<div class="form-group">
						<label>City</label>
						<input type="text" class="form-control" v-model="info.customer_ship_city" />
					</div>
					<br />

					<div class="form-group">
						<label>State</label>
						<div class="col-sm-10">
							<select class="form-control" id="customer_bill_state" name="customer_bill_state" v-model="info.customer_ship_state">
								<option value="AK">Alaska</option>
								<option value="AL">Alabama</option>
								<option value="AR">Arkansas</option>
								<option value="AZ">Arizona</option>
								<option value="CA">California</option>
								<option value="CO">Colorado</option>
								<option value="CT">Connecticut</option>
								<option value="DC">District of Columbia</option>
								<option value="DE">Delaware</option>
								<option value="FL">Florida</option>
								<option value="GA">Georgia</option>
								<option value="HI">Hawaii</option>
								<option value="IA">Iowa</option>
								<option value="ID">Idaho</option>
								<option value="IL">Illinois</option>
								<option value="IN">Indiana</option>
								<option value="KS">Kansas</option>
								<option value="KY">Kentucky</option>
								<option value="LA">Louisiana</option>
								<option value="MA">Massachusetts</option>
								<option value="MD">Maryland</option>
								<option value="ME">Maine</option>
								<option value="MI">Michigan</option>
								<option value="MN">Minnesota</option>
								<option value="MO">Missouri</option>
								<option value="MS">Mississippi</option>
								<option value="MT">Montana</option>
								<option value="NC">North Carolina</option>
								<option value="ND">North Dakota</option>
								<option value="NE">Nebraska</option>
								<option value="NH">New Hampshire</option>
								<option value="NJ">New Jersey</option>
								<option value="NM">New Mexico</option>
								<option value="NV">Nevada</option>
								<option value="NY">New York</option>
								<option value="OH">Ohio</option>
								<option value="OK">Oklahoma</option>
								<option value="OR">Oregon</option>
								<option value="PA">Pennsylvania</option>
								<option value="PR">Puerto Rico</option>
								<option value="RI">Rhode Island</option>
								<option value="SC">South Carolina</option>
								<option value="SD">South Dakota</option>
								<option value="TN">Tennessee</option>
								<option value="TX">Texas</option>
								<option value="UT">Utah</option>
								<option value="VA">Virginia</option>
								<option value="VT">Vermont</option>
								<option value="WA">Washington</option>
								<option value="WI">Wisconsin</option>
								<option value="WV">West Virginia</option>
								<option value="WY">Wyoming</option>
							</select>
						</div>
					</div>
					<br />

					<div class="form-group">
						<label>Zip Code</label>
						<input type="text" class="form-control" v-model="info.customer_ship_zip" />
					</div>
					<br />
				</div>
			</div>
			<button type="submit" class="btn btn-danger mt-3">Checkout</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			product: [], //array for multiple submissions to be stored for client

			info: {
				customer_f_name: "",
				customer_l_name: "",
				customer_email: "",
				customer_bill_address: "",
				customer_bill_address_two: "",
				customer_bill_city: "",
				customer_bill_state: "",
				customer_bill_zip: "",
				qty: "",
				product_id: this.$route.params.product_id,
				cost: this.$route.params.cost,
			},
		};
	},
	created() {
		axios
			.get(`http://localhost:3000/api/product-reviews/${this.$route.params.product_id}`)
			.then((res) => {
				this.product = res.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},
	methods: {
		//https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
		getImgUrl() {
			var images = require.context("../assets/", false, /\.png$/);
			return images("./" + this.$route.params.product_id + ".png");
		},

		formatPrice(value) {
			let val = (value / 1).toFixed(2).replace(",", ".");
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
		handleSubmitForm() {
			let apiURL = `http://localhost:3000/api/checkout/`;
			axios
				.post(apiURL, this.info)
				.then(() => {
					this.$router.push("/");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>

<style scoped>
img {
	width: 300px;
	height: auto;
}
</style>
