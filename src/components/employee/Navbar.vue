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
                window.location.reload();
            },
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
    .navbar {
        font-family: Arial, sans-serif;
        padding: 10px;
    }
    .nav-item {
        margin: 0 10px;
    }
    .nav-link {
        color: #fff;
        transition: color 0.3s ease;
    }
    .nav-link:hover {
        color: #ccc;
    }
    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        color: #fff;
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }
    </style>
    