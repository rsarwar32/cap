<template>
  <div>
    <h2 align="center">Worst Sellers</h2>
    <br />
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Total Sold</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in rows" :key="x.product_id">
              <td>{{ x.product_id }}</td>
              <td>{{ x.product_name }}</td>
              <td>{{ x.product_desc }}</td>
              <td>${{ formatPrice(x.product_cost) }}</td>
              <td>{{ x.Count }}</td>
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
    let apiURL = `http://localhost:3000/api/worstSellers`;
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
