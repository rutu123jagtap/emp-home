<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-lg-4">
        <div class="d-flex flex-column align-items-center mb-4">
            <img class="logo mb-4" src="C:\Users\rutuja.jagtap\vue3-emp\src\assets\logo.jpg" />
            <h1 class="login-title mb-4">Sign Up</h1>
        </div>
      <div class="register">
        <div class="mb-3">
            <input type="text" class="form-control" v-model="name" placeholder="Enter Name">
        </div>
        <div class="mb-3">
            <input type="text" class="form-control" v-model="email" placeholder="Enter Email" @blur="validateEmail">
        </div>
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
        <div class="mb-3">
            <input type="password" class="form-control" v-model="password" placeholder="Enter Password" @blur="validatePassword">
        </div>
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        <div class="mb-3">
            <button @click="signUp" :disabled="!isEmailValid || !isPasswordValid" class="btn btn-primary">Sign Up</button>
        </div>
        <p>Already have an account? <router-link to="/login" class="login-link">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isEmailValid: false,
      isPasswordValid: false
    };
  },
  methods: {
    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.email).toLowerCase())) {
        this.emailError = '';
        this.isEmailValid = true;
      } else {
        this.emailError = 'Invalid email format';
        this.isEmailValid = false;
      }
    },
    validatePassword() {
      const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (re.test(this.password)) {
        this.passwordError = '';
        this.isPasswordValid = true;
      } else {
        this.passwordError = 'Password must contain eight characters, including letter and number';
        this.isPasswordValid = false;
      }
    },
    async signUp() {
      try {
        const response = await axios.post('http://localhost:3030/users', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        if (response.status === 201) {
          localStorage.setItem('user.info', JSON.stringify(response.data));
          this.$router.push({ name: 'list' });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>

<style scoped>
.logo {
  width: 80px;
}

.register {
  text-align: center;
}

.login-title {
  font-size: 28px;
  color: #333;
}

.register button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 5px;
  margin-bottom: 5px;
}

.login-link {
  color: #007bff;
}
</style>
