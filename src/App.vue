<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoggedIn = ref(!!localStorage.getItem("token"));

const checkLoginStatus = () => {
    isLoggedIn.value = !!localStorage.getItem("token");
};

const logout = () => {
    localStorage.removeItem("token");

    isLoggedIn.value = false;

    window.dispatchEvent(new Event("auth-change"));

    router.push("/login");
};

onMounted(() => {
    window.addEventListener("auth-change", checkLoginStatus);
});

onUnmounted(() => {
    window.removeEventListener("auth-change", checkLoginStatus);
});
</script>


<template>

    <nav class="navbar">

        <!-- ACE FITNESS - ALWAYS CENTERED -->
        <RouterLink
            to="/"
            class="logo"
        >
            ACE FITNESS
        </RouterLink>


        <!-- LOGOUT - ONLY SHOWS WHEN LOGGED IN -->
        <button
            v-if="isLoggedIn"
            class="nav-logout"
            @click="logout"
        >
            Logout
        </button>

    </nav>


    <RouterView />

</template>


<style>

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
}


.navbar {
    width: 100%;
    height: 60px;

    background-color: #304766;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
}


.logo {
    color: white;

    text-decoration: none;

    font-size: 22px;
    font-weight: bold;

    letter-spacing: 2px;
}


.logo:hover {
    opacity: 0.8;
}


/* LOGOUT BUTTON */
.nav-logout {
    position: absolute;

    right: 50px;

    border: none;

    padding: 9px 18px;

    border-radius: 5px;

    cursor: pointer;

    font-size: 14px;
}


.nav-logout:hover {
    opacity: 0.85;
}

</style>