<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1> Create Event Form </h1>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Event Name</label>
                    <input type="text" class="form-control" v-model="event.event_name" required>
                </div><br>

                <div class="form-group">
                    <label>Event Description</label>
                    <input type="text" class="form-control" v-model="event.event_desc" required>
                </div><br> 

                <div class="form-group">
                    <label>Event Date</label>
                    <input type="date" class="form-control" v-model="event.event_date" required>
                </div><br>

                <div class="form-group">
                    <label>Event Location</label>
                    <select class="form-select" aria-label="Default select example" v-model="event.location_id" required>
                        <option v-for="i in rows" :key="i.location_id" :value="i.location_id">{{i.location_name}}</option>
                    </select>
                </div><br>

            <button class="btn btn-danger mt-3">Create Event</button>
          </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        name: '#CreateEvent',
        data() {
            return {
                errors: [],
                rows: [],
                event: {
                   location_id: '',
                   event_name: '',
                   event_desc: '',
                   event_date: '' ,
                }
            }
        },
        created() {
            let apiURL = `http://localhost:3000/api/locations`;
            axios.get(apiURL).then(res => {
                this.rows = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/api/eventadd'; // path to database on server
                this.errors = []; //throw any errors
                axios.post(apiURL, this.event).then(() => {
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