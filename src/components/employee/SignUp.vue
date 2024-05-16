<template>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="col-lg-4">
        <div class="my-container mx-32px 25px px-4 py-8">
          <div class="d-flex flex-column align-items-center mb-4">
            <img class="logo mb-4" src="C:\Users\rutuja.jagtap\vue3-emp\src\assets\logo.jpg" />
            <h1 class="login-title mb-4">Sign Up</h1>
          </div>
          <div class="register">
            <div class="mb-3">
              <input type="text" class="form-control" v-model="name" placeholder="Enter Name" required>
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" v-model="email" placeholder="Enter Email" required>
            </div>
            <p v-if="emailError" class="error-message">{{ emailError }}</p>
            <div class="mb-3">
              <div class="password-input">
                <input class="form-control" v-model="password" :type="passwordVisible ? 'text' : 'password'" placeholder="Enter Password" required>
                <span class="password-toggle" @click="togglePasswordVisibility">
                  <i :class="passwordVisible ? 'far fa-eye ' : 'far fa-eye-slash'"></i>
                </span>
              </div>
            </div>
            <div class="mb-3">
              <div class="password-input">
                <input class="form-control" v-model="cpassword" :type="cpasswordVisible ? 'text' : 'password'" placeholder="Confirm Password" required>
                <span class="password-toggle" @click="toggleCPasswordVisibility">
                  <i :class="cpasswordVisible ? 'far fa-eye ' : 'far fa-eye-slash'"></i>
                </span>
              </div>
            </div>
            <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
            <div class="mb-3">
              <button @click="signUp" class="btn btn-primary">Sign Up</button>
            </div>
            <p>Already have an account? <router-link to="/login" class="login-link">Login</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import bcrypt from 'bcryptjs';
  import { useStore } from "vuex";
  
  export default {
    name: 'SignUp',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        cpassword: '',
        emailError: '',
        passwordError: '',
        isEmailValid: false,
        isPasswordValid: false,
        passwordVisible: false,
        cpasswordVisible: false
      };
    },
    methods: {
      validateEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.isEmailValid = re.test(String(this.email).toLowerCase());
        return this.isEmailValid;
      },
      validatePassword() {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        this.isPasswordValid = re.test(this.password);
        return this.isPasswordValid;
      },
      signUp() {
        if (!this.validateEmail()) {
          this.emailError = 'Invalid email format';
        } else {
          this.emailError = '';
        }
  
        if (!this.validatePassword()) {
          this.passwordError = 'Password must contain eight characters, including letter and number';
        } else {
          this.passwordError = '';
        }
  
        if (this.password !== this.cpassword) {
          this.passwordError = 'Passwords do not match';
          return;
        } else {
          this.passwordError = '';
        }
  
        if (this.isEmailValid && this.isPasswordValid) {
          this.registerUser();
        }
      },
      async registerUser() {
        try {
          const hashedPassword = await bcrypt.hash(this.password, 10);
          const response = await axios.post('http://localhost:3030/users', {
            name: this.name,
            email: this.email,
            password: hashedPassword
          });
          if (response.status === 201) {
            localStorage.setItem('user.info', JSON.stringify(response.data));
            this.$router.push({ name: 'list' });
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
      },
      toggleCPasswordVisibility() {
        this.cpasswordVisible = !this.cpasswordVisible;
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
  
  .my-container {
    max-width: 5xl;
    margin-left: 3rem;
    margin-right: 3rem;
    background-color: #ebe9e9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .password-input {
    position: relative;
  }
  
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  </style>
  