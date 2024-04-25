<template>
<div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-lg-4">
        <div class="d-flex flex-column align-items-center mb-4">
            <img class="logo mb-4" src="C:\Users\rutuja.jagtap\vue3-emp\src\assets\logo.jpg" />
            <h1 class="login-title mb-4">Login</h1>
        </div>
        <div class="login">
            <div class="mb-3">
                <input type="text" class="form-control" v-model="email" placeholder="Enter Email">
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" v-model="password" placeholder="Enter Password">
            </div>
            <div class="mb-3">
                <button @click="login" class="btn btn-primary">Login</button>
            </div>
            <p class="error-message" :class="{ visible: errorMessageVisibility }">Incorrect email or password.</p>
            <p>Don't have an account? <router-link to="/sign-up" class="signup-link">Sign Up</router-link>
            </p>
        </div>
    </div>
</div>
</template>

  
<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            errorMessageVisibility: false
        };
    },
    methods: {
        async login() {
            try {
                const result = await axios.get(`http://localhost:3030/users`);

                if (result.status == 200 && result.data.length > 0) {
                    const user = result.data.find(user => user.email === this.email && user.password === this.password);
                    if (user) {
                        localStorage.setItem("user.info", JSON.stringify(user));
                        this.$router.push({
                            name: 'list'
                        });
                    } else {
                        this.errorMessageVisibility = true;
                    }
                }

            } catch (error) {
                this.errorMessageVisibility = true;
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user.info');
        if (user) {
            this.$router.push({
                name: 'list'
            });
        }
    }
};
</script>

  
<style scoped>
.logo {
    width: 80px;
}

.login-title {
  font-size: 28px;
  color: #333;
}

.login {
    text-align: center;
}

.error-message {
    color: red;
    visibility: hidden;
}

.signup-link {
    color: #007bff;
}
.error-message.visible {
    visibility: visible;
}
</style>
