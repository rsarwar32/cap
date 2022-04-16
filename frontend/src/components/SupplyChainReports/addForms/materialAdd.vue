<template>  
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2> New material </h2>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Supply Order ID</label>
                    <input type="number" min=1 class="form-control" v-model="material.so_id" required>
                </div>

                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="material.material_name" required>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <input type="textarea" class="form-control" v-model="material.material_desc">
                </div>

                <div class="form-group">
                    <label>Cost</label>
                    <input type="price" step=0.01 min=0 class="form-control" v-model="material.material_cost">
                </div>

                <div class="form-group">
                    <label>Supplier</label>
                    <select class="form-select" aria-label="Default select example" v-model="material.supplier_id" required>
                        <option v-for="i in rows" :key="i.supplier_id" :value="i.supplier_id">{{i.supplier_name}}</option>
                    </select>
                </div><br>

                <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" min=1 class="form-control" v-model="material.qty" required>
                </div><br>

                <button class="btn btn-danger mt-3">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name:'#newMaterial',
        data() {
            return {
                errors: [],
                rows: [],
                material: {
                    so_id: '',
                    supplier_id: '',
                    material_name: '',
                    material_desc: '',
                    material_cost: '',
                    qty: '',
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
            // call stored procedure instead with last_insert_id for material and supplier id from form.
            let apiURL = 'http://localhost:3000/api/newMaterial';
            axios.post(apiURL, this.material).then(() => {
              this.$router.push('/reports/suppliers-orders')
            }).catch(errors => {
              this.errors.push("There's an error submitting form." + errors.response.data);
            })
          }
        }
    }; 
</script>

<style scoped>
 .form-group{
     column-span: 100%;
 }
</style>
