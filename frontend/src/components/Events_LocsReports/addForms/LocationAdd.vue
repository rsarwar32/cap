<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1> Add Location Form </h1>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Location Name</label>
                    <input type="text" class="form-control" v-model="location.location_name" required>
                </div><br>

                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="location.location_address" required>
                </div><br> 

                <div class="form-group">
                    <label>Address Two</label>
                    <input type="text" class="form-control" v-model="location.location_address_two">
                </div><br>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="location.location_city" required>
                </div><br>

                <div class="form-group">
                    <label>State</label>
                    <select class="form-select" aria-label="Default select example" v-model="location.location_state" required>
                        <option v-for="i in rows" :key="i.state_abbr" :value="i.state_abbr">{{i.state_abbr}}</option>
                    </select>
                </div><br>

                <div class="form-group">
                    <label>Zip Code</label>
                    <input type="text" class="form-control" v-model="location.location_zip" required>
                </div><br>

            <button class="btn btn-danger mt-3">Create location</button>
          </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        name: '#Createlocation',
        data() {
            return {
                errors: [],
                rows: [],
                location: {
                   location_name: '',
                   location_address: '',
                   location_address_two: '',
                   location_city: '',
                   location_state: '',
                   location_zip: ''
                }
            }
        },
        created() {
            let apiURL = `http://localhost:3000/api/states`;
            axios.get(apiURL).then(res => {
                this.rows = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/api/location'; // path to database on server
                axios.post(apiURL, this.location).then(() => {
                    this.$router.push('/reports/events') 
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