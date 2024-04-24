<template>
    <img class="logo" src="../assets/th.jpg"/>
    <h1>Sign Up </h1>
    <div class="register">
      <input type="text" v-model="name" placeholder="Enter Name:">
      <input type="text" v-model="email" placeholder="Enter Email:">
      <input type="text" v-model="password" placeholder="Enter Password:">
      <button v-on:click="signUp">SignUp</button>
      <p>
        <router-link to="/login">Login</router-link>
      </p>
  
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  export default {
      name :  'SignUp',
      data(){
          return{
              name:'',
              email:'',
              password:''
          }
      },
      methods:{
          async signUp(){
              console.log("signUp", this.name, this.email, this.password)
              let result = await axios.post("http://localhost:3030/users", {
                  email:this.email,
                  name:this.name,
                  password:this.password,
                  is_deleted: 0 
              });
              console.log(result);
              if(result.status==201){
                  localStorage.setItem("user.info",JSON.stringify(result.data))
                  this.$router.push({name: 'list'})
              }
          }
      },
      mounted()
      {
        let user = localStorage.getItem('user.info');
        if(user)
        {
            this.$router.push({ name: 'list' })
        }
      }
  
  }
  </script>
  
  <style>
  .logo{
      width: 70px; 
      margin: 0%;
  }
  .register input{
      width: 300px;
      height: 40px;
      padding-left: 20px;
      display: block;
      margin-bottom: 30px;
      margin-left: auto;
      margin-right: auto;
      border: 1px solid skyblue;
  }
  
  .register button{
      width: 320px;
      height: 40px;
      border: 1px solid skyblue;
      color: #fff;
      background-color: skyblue;
      cursor: pointer
  }
  
  </style>