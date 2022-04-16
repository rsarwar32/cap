<template>
	<div>
		<h1>Cart</h1>
		<div v-for="(c, index) of cart" :key="c.id">
			<p>{{ c.name }}</p>
			<img :src="c.imageUrl" />
			<button @click="removeFromCart(index)">remove from cart</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "Cart",
	data() {
		return {
			cart: [],
		};
	},
	methods: {
		removeFromCart(itemId) {
			const cartItems = JSON.parse(localStorage.getItem("cart"));
			const index = cartItems.findIndex(({ id }) => id === itemId);
			cartItems.splice(index, 1);
			localStorage.setItem("cart", JSON.stringify(cartItems));
			this.cart = JSON.parse(localStorage.getItem("cart"));
		},
		getCart() {
			if (!localStorage.getItem("cart")) {
				localStorage.setItem("cart", JSON.stringify([]));
			}
			this.cart = JSON.parse(localStorage.getItem("cart"));
		},
	},
	beforeMount() {
		this.getCart();
	},
};
</script>
