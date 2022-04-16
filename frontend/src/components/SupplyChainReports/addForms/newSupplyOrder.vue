
<template>  
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2>Supply order </h2>
            <form @submit.prevent="handleSubmitForm">
                
                <div class="form-group">
                    <label>Order Date</label>
                    <input type="date" class="form-control" v-model="supply_order.so_date" required>
                </div>

                <div class="form-group">
                    <label>Supplier</label>
                    <select class="form-select" aria-label="Default select example" v-model="supply_order.supplier_id" required>
                        <option v-for="i in rows" :key="i.supplier_id" :value="i.supplier_id">{{i.supplier_name}}</option>
                    </select>
                </div><br>

                <div class="form-group">
                    <label>Payment Method</label>
                    <input type="text" class="form-control" v-model="supply_order.so_payment_methods" required>
                </div>

                <div class="form-group">
                    <label>Subtotal</label>
                    <input type="number" class="form-control" v-model.number="supply_order.so_subtotal" required>
                </div>

                <div class="form-group">
                    <label>Shipping</label>
                    <input type="number" class="form-control" v-model.number="supply_order.so_shipping" required>
                </div>   
        
                <div class="form-group">
                    <label>Tax</label>
                    <input type="number" class="form-control" v-model.number="supply_order.so_tax" required>
                </div>                

                <div class="form-group">
                    <label>Total</label>
                    <input type="number" class="form-control" v-model.number="supply_order.so_total" required>
                </div>

                <button class="btn btn-danger mt-3">Enter Order</button>

            </form>
        </div>
    </div>        
</template>

<script>
import axios from "axios";
//import moment from "moment"

export default {
    name:'#supplyOrder',
    data() {
        return {
            errors:[],
            rows: [],
            supply_order: {
                so_date:'',
                supplier_id: '',
                so_payment_methods:'',
                so_subtotal: '',
                so_shipping:'',
                so_tax: '',
                so_total: ''           
            }
        }
  }, 
    created() {
        let apiURL = `http://localhost:3000/api/suppliers`;
            axios.get(apiURL).then(res => {
                this.rows = res.data;
            }).catch(error => {
                console.log(error)
            });
    },
    methods: {
    handleSubmitForm() {
      console.log(this.supply_order.so_date)
      let apiURL = "http://localhost:3000/api/newSupplyOrder";
      axios.post(apiURL, this.supply_order).then(() => {
        this.$router.push("/admin");
      }).catch((errors) => {
        this.errors.push("There's an error submitting form." + errors.response.data);
      });
    }
  }
};
</script>


<style scoped>
.form-group {
  column-span: 100%;
}
</style>
