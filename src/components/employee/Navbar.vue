<template>
    <nav class="navbar navbar-expand-lg" :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/"> My Vue</router-link>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">
                        List
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link" :class="{ active: isActive('/edit/:id') }">
                        Edit
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link" :class="{ active: isActive('/view/:id') }">
                        View
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
            logout(){
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
    