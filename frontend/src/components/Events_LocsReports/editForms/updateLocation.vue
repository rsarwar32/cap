<template>
  <center>
    <div class="container mt-3 mb-3 d-flex justify-content-center">
      <div class="card px-3 py-3 alert-primary clearfix">
        <div class="card-body">
        <h6 class="information mt-0">Fill in the form below to edit the location</h6>

            <div class="row  mt-4">
              <div class="col-mt-12">
                <div class="cascading-dropdown">
                  <select class="dropdown" type="text" placeholder="Location Name" v-model="locationid" required>
                  <option value=Selected>Location>: </option>
                  <option v-for="loc in location" :key="loc.location_name" v-bind:values="location.location_name"> {{loc.location_name}} </option>
                  </select>
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" placeholder="Location Address" v-if="location.location_name !== ''" v-bind:values="location.location_address" required/>
                </div>
                <div class="form-group">
                  <input class="form-control" type="text" placeholder="Location Address Cont" v-model="location.location_address_two" required/>
                </div>
                <div class="form-group">
                  <input class="form-control" type="text" placeholder="Location City" v-model="location.location_city" required/>
                </div>
                <div class="form-group">
                  <input class="form-control" type="text" placeholder="Location State" v-model="location.location_state" required/>
                </div>
                <div class="form-group">
                  <input class="form-control" type="text" placeholder="Location Zip" v-model="location.location_zip" required/>
                </div>
              </div>
            </div>

            <div class="control">
              <button class="btn btn-info mt-4" @click.prevent="updateItem">UPDATE</button>
            </div>   

        </div>
      </div>
    </div>
  </center>  
</template>

<script>
import axios from "axios";
 
export default {
  data() {
    return {
      locationid: "",
      location: [],
    };
    
  },
  created() {
    this.getLocation();

    let URL = 'http://localhost:3000/api/locations';
    axios.get(URL).then((response) => {
      this.location = response.data;
    });
  },
  methods: {
    async getLocation() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/locations/${this.$route.params.id}`
        );
        this.locationid = response.data.location_id;
      } catch (err) {
        console.log(err);
      }
    },
 
    async updateLocation() {
      try {
        await axios.put(
          `http://localhost:3000/locations/${this.$route.params.id}`,
          {
            location_name: this.locationid,
            location_address: this.locationid,
            location_address_two: this.locationid,
            location_city: this.locationid,
            location_state: this.locationid,
            location_zip: this.locationid
          }
        );
        this.$router.push("/Admin");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>