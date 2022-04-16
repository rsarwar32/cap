<!--<template>
    <div class="hello">
    <div class="list-group list-group-flush" v-for="category in Categories" :key="category.prod_cat_id">
        <router-link class="list-group-item list-group-item-action" :to="{name: 'products', params: { product_category: category.prod_cat_id }}">{{ category.prod_cat_name }}</router-link>
    </div>
  </div>
</template>-->
<template>
<div class="card text-center" style="width: 100%;">
  <img class="card-img-top" :src="getImgUrl()" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">By Steph</h5><br>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush" v-for="category in Categories" :key="category.prod_cat_id">
    <router-link class="list-group-item list-group-item-action border-0" :to="{name: 'products', params: { product_category: category.prod_cat_id }}">{{ category.prod_cat_name }}</router-link>
  </ul>
  <div class="card-body">
    <a href="https://www.etsy.com/shop/UrbanScentsbySteph" class="card-link">Etsy</a>
    <a href="#" class="card-link">Square</a>
  </div>
</div>
</template>


<script>
    import axios from "axios";
    export default {
        data() {
            return {
                Categories: []
            }
        },
        // this is using created hook 
        created() {
            let apiURL = 'http://localhost:3000/api/product_category';
            axios.get(apiURL).then(res => {
                this.Categories = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            //https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
            getImgUrl() { 
                var images = require.context('../assets/', false, /\.png$/)
                return images('./' + "Logo-PNG" + ".png")
            },
        }
    }
</script>

<style scoped>
 img {
     width: 300px;
     height: auto;
     display: block;
        margin-left: auto;
    margin-right: auto;
 }
</style>
