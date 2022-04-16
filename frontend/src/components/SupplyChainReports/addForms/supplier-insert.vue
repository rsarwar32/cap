<template>  
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2> New supplier </h2>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="form-control" v-model="supplier.supplier_name" required>
                </div>

                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="supplier.supplier_address" required>
                </div>

                <div class="form-group">
                    <label>Address (con't)</label>
                    <input type="text" class="form-control" v-model="supplier.supplier_address_two">
                </div>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="supplier.supplier_city" required>
                </div>

                <div class="form-group">
                    <label>State</label>
                    <select class="form-select" aria-label="Default select example" v-model="supplier.supplier_state" required>
                        <option v-for="i in rows" :key="i.state_abbr" :value="i.state_abbr">{{i.state_abbr}}</option>
                    </select>
                </div><br>

                <div class="form-group">
                    <label>Zip code</label>
                    <input type="number" class="form-control" v-model="supplier.supplier_zip" required>
                </div>

                <div class="form-group">
                    <label>Contact First Name</label>
                    <input type="text" class="form-control" v-model="supplier.supplier_contact_f_name">
                </div>

                <div class="form-group">
                    <label>Contact Last Name</label>
                    <input type="text" class="form-control" v-model="supplier.supplier_contact_l_name">
                </div>

                <div class="form-group">
                    <label>Contact Email</label>
                    <input type="text" class="form-control" v-model="supplier.supplier_contact_email">
                </div>

                <div class="form-group">
                    <label>Notes</label>
                    <input type="textarea" class="form-control" v-model="supplier.supplier_notes">
                </div>

                <button class="btn btn-danger mt-3">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "#CreateSupplier",
  data() {
    return {
      errors: [],
      rows: [],
      supplier: {
          supplier_name:'',
          supplier_address:'',
          supplier_address_two:'',
          supplier_city:'',
          supplier_state:'',
          supplier_zip:'',
          supplier_contact_f_name:'',
          supplier_contact_l_name:'',
          supplier_contact_email:'',
          supplier_notes:''
      },
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
      let apiURL = "http://localhost:3000/api/newSupplier";
      axios.post(apiURL, this.supplier).then(() => {
        this.$router.push("/reports/suppliers");
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
