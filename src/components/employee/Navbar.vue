<template>
<nav class="navbar navbar-expand-lg" :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']">
    <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
            <img class="d-flex logo mb-4" src="C:\Users\rutuja.jagtap\vue3-emp\src\assets\logo.jpg" />
        </router-link>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-1/2 navh">
            <li class="nav-item">
                <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">
                    LIST
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/add" class="nav-link" :class="{ active: isActive('/add') }">
                    ADD
                </router-link>
            </li>
        </ul>
        <form class="d-flex">
            <!-- <button class="btn btn-primary" @click.prevent="changeTheme()">
                    toggle navbar
                </button> -->

            <button class="btn btn-primary" @click="logout">
                Logout
            </button>
        </form>
    </div>
</nav>
</template>

    
<script>
export default {
    data() {
        return {
            theme: 'dark',
        }
    },
    methods: {
        logout() {
            console.warn("logout");
            localStorage.clear();
        },
        // changeTheme() {
        //     this.theme = this.theme == 'light' ? 'dark' : 'light';
        // },
        isActive(url) {
            return this.$route.path === url;
        },
    }
}
</script>

    
<style scoped>
.logo {
    width: 40px;
}
.navh{
    width: 50rem;
}
</style>
