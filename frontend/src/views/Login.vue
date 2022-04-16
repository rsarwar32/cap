<template>
    <div>
        <form @submit.prevent="login">
        <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" v-model="username" required >
        </div><br>       
        
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" required>
        </div>
        
        <button type="submit" class="btn btn-danger mt-3">Login</button>
        </form>
    </div>
</template>

<script>
    
    import { loginUser } from '../utils/auth'
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            async login() {
                try {
                    await loginUser(this.username, this.password)
                    this.$router.push('/admin')
                } catch (err) {
                    alert(`Incorrect Username/Password`)                    
                }
            }
        }
    }
</script>

<style>
    .input-group {
        margin: 1rem;
    }
    .input-group label {
        margin-right: 0.5rem;
    }
</style>