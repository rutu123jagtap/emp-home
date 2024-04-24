<template>
<img class="logo" src="../assets/th.jpg" />
<h1>Login</h1>
<div class="login">
    <input type="text" v-model="email" placeholder="Enter Email:">
    <input type="text" v-model="password" placeholder="Enter Password:">
    <button v-on:click="login">Login</button>
    <p>
        <router-link to="/sign-up">SignUp</router-link>
    </p>

    <p :style="{ visibility: errorMessageVisibility }">Incorrect email or password.</p>


</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            errorMessageVisibility: 'hidden'
        }
    },
    methods: {
        async login() {
            try {
                const result = await axios.get(
                    `http://localhost:3030/users`
                )

                if (result.status == 200 && result.data.length > 0) {

                    // console.log(result.data[0]['email']);
                    // if(this.email == result.data[0]['email'] && this.password == result.data[0]['password']){
                    //     localStorage.setItem("user.info", JSON.stringify(result.data[0]))
                    //     this.$router.push({
                    //         name: 'list'
                    //     });
                    // }
                    // else{
                    //     console.log('Error');
                    // }

                    const user = result.data.find(user => user.email === this.email && user.password === this.password);
                    if (user) {
                        localStorage.setItem("user.info", JSON.stringify(user));
                        this.$router.push({
                            name: 'list'
                        });
                    } else {

                        this.errorMessageVisibility = 'visible';
                        console.log('Incorrect email or password.');
                    }

                }

            } catch (error) {
                this.errorMessageVisibility = 'visible';
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

}
</script>

<style scoped>
.logo {
    width: 70px;
    margin: 0%;
}

.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid skyblue;
}

.register button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    color: #fff;
    background-color: skyblue;
    cursor: pointer
}
</style>
