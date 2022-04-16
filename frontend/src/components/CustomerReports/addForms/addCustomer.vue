<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1> Add a Customer </h1>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="customer.customer_f_name" required>
                </div><br>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="customer.customer_l_name" required>
                </div><br> 

                <div class="form-group">
                    <label>Shipping Address</label>
                    <input type="text" class="form-control" v-model="customer.customer_ship_address" required>
                </div><br>

                <div class="form-group">
                    <label>Shipping Address (Cont'd)</label>
                    <input type="text" class="form-control" v-model="customer.customer_ship_address_two" required>
                </div><br>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="customer.customer_ship_city" required>
                </div><br>

                <div class="form-group">
                    <label>State</label>
                    <input type="text" class="form-control" v-model="customer.customer_ship_state" required>
                </div><br>

                <div class="form-group">
                    <label>Zip</label>
                    <input type="number" class="form-control" v-model="customer.customer_ship_zip" required>
                </div><br>                

                <div class="form-group">
                    <label>Shipping Address</label>
                    <input type="text" class="form-control" v-model="customer.customer_bill_address" required>
                </div><br>

                <div class="form-group">
                    <label>Shipping Address (Cont'd)</label>
                    <input type="text" class="form-control" v-model="customer.customer_bill_address_two" required>
                </div><br>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="customer.customer_bill_city" required>
                </div><br>

                <div class="form-group">
                    <label>State</label>
                    <input type="text" class="form-control" v-model="customer.customer_bill_state" required>
                </div><br>

                <div class="form-group">
                    <label>Zip</label>
                    <input type="number" class="form-control" v-model="customer.customer_bill_zip" required>
                </div><br>  

                <div class="form-group">
                    <label>Email </label>
                    <input type="text" class="form-control" v-model="customer.customer_email" required>
                </div><br>

                <div class="form-group">
                    <label>Points</label>
                    <input type="number" class="form-control" v-model="customer.customer_point_total" required>
                </div><br>  



            <button class="btn btn-danger mt-3">Create customer</button>
          </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        name: '#Createcustomer',
        data() {
            return {
                errors: [],
                rows: [],
                customer: {
                   customer_f_name: '',
                   customer_l_name: '',
                   customer_ship_address: '' ,
                   customer_ship_address_two: '',
                   customer_ship_city: '',
                   customer_ship_state: '' ,
                   customer_ship_zip: '' ,
                   customer_bill_address: '' ,
                   customer_bill_address_two: '',
                   customer_bill_city: '',
                   customer_bill_state: '' ,
                   customer_bill_zip: '' ,      
                   customer_email:'',
                   customer_point_total:''             
                }
            }
        },
        created() {

        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/api/addCustomer'; 
                this.errors = []; 
                axios.post(apiURL, this.customer).then(() => {
                    this.$router.push('/reports/all-customers')
                }).catch(errors => {
                    this.errors.push("There's an error submitting form." + errors.response.data);
                });
            }
        }
    }; 
</script>

<style scoped>
 .form-group{
     column-span: 100%;
 }
</style>