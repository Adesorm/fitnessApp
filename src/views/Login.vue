<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const message = ref("");

const login = async () => {

    message.value = "";

    try {

        const response = await fetch(
            "https://fitnessapi-cabanisan-2.onrender.com/users/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            }
        );

        const data = await response.json();

        // Check what the API is returning
        console.log("Login response:", data);

        if (!response.ok) {

            message.value =
                data.message || "Login failed";

            return;
        }

        // Get token from API response
        const token =
            data.access ||
            data.token ||
            data.accessToken;

        // Check if token exists
        if (!token) {

            message.value =
                "Login was successful but no token was received.";

            console.log("No token found:", data);

            return;
        }

        // Save token
        localStorage.setItem("token", token);

        // Update navbar
        window.dispatchEvent(
            new Event("auth-change")
        );

        message.value =
            "Login successful!";

        // Redirect
        router.push("/workouts");

    } catch (error) {

        console.error("Login error:", error);

        message.value =
            "Something went wrong. Please try again.";

    }

};
</script>


<template>

    <div class="container">

        <h1>Login</h1>

        <form @submit.prevent="login">

            <div>
                <label>Email</label>

                <br>

                <input
                    v-model="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                >
            </div>

            <br>

            <div>
                <label>Password</label>

                <br>

                <input
                    v-model="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                >
            </div>

            <br>

            <button type="submit">
                Login
            </button>

        </form>

        <p>{{ message }}</p>

        <p>
            Don't have an account?

            <RouterLink to="/register">
                Register here
            </RouterLink>
        </p>

    </div>

</template>