<template>
<div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-lg-4">
        <div class="my-container mx-32px 25px px-4 py-8">
            <div class="d-flex flex-column align-items-center mb-4">
                <img class="logo mb-4" src="C:\Users\rutuja.jagtap\vue3-emp\src\assets\logo.jpg" />
                <h1 class="login-title mb-4">Login</h1>
            </div>
            <div class="login">
                <div class="mb-3">
                    <input type="text" class="form-control" v-model="email" placeholder="Enter Email">
                    <p class="error-message" v-if="emailError">{{ emailError }}</p>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" v-model="password" placeholder="Enter Password">
                    <p class="error-message" v-if="passwordError">{{ passwordError }}</p>
                </div>
                <div class="mb-3">
                    <button @click="login" class="btn btn-primary">Login</button>
                </div>
                <p class="error-message" v-if="errorMessageVisibility">Incorrect email or password.</p>
                <p>Don't have an account? <router-link to="/sign-up" class="signup-link">Sign Up</router-link>
                </p>
                <!-- <p><router-link to="/forgot-password" class="forgot-password-link">Forgot Password?</router-link></p> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            errorMessageVisibility: false
        };
    },
    methods: {
        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        validatePassword(password) {
            return password.length >= 8;
        },
        async login() {
            this.emailError = '';
            this.passwordError = '';
            this.errorMessageVisibility = false;

            if (!this.validateEmail(this.email)) {
                this.emailError = 'Invalid email';
                this.$forceUpdate();
            }

            if (!this.validatePassword(this.password)) {
                this.passwordError = 'Password must be at least 8 characters';
                this.$forceUpdate();
            }

            if (this.emailError || this.passwordError) {
                return;
            }

            try {
                const result = await axios.get(`http://localhost:3030/users`);

                if (result.status === 200 && result.data.length > 0) {
                    const user = result.data.find(user => user.email === this.email);
                    if (user) {
                        const passwordMatch = await bcrypt.compare(this.password, user.password);
                        if (passwordMatch) {
                            localStorage.setItem("user.info", JSON.stringify(user));
                            this.$router.push({
                                name: 'list'
                            });
                        } else {
                            this.errorMessageVisibility = true;
                        }
                    } else {
                        this.errorMessageVisibility = true; // User not found
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
}

.signup-link {
    color: #007bff;
}

.my-container {
    max-width: 5xl;
    margin-left: 3rem;
    margin-right: 3rem;
    background-color: #ebe9e9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
