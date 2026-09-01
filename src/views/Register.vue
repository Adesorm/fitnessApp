<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const message = ref("");

const register = async () => {
    try {
        const response = await fetch(
            "https://fitnessapi-cabanisan-2.onrender.com/users/register",
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

        if (!response.ok) {
            message.value =
                data.message || "Registration failed";
            return;
        }

        message.value = "Registration successful!";

        setTimeout(() => {
            router.push("/login");
        }, 1000);

    } catch (error) {
        console.error(error);
        message.value =
            "Something went wrong. Please try again.";
    }
};
</script>

<template>
    <div class="container">

        <h1>Register</h1>

        <form @submit.prevent="register">

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
                Register
            </button>

        </form>

        <p>{{ message }}</p>

        <p>
            Already have an account?

            <RouterLink to="/login">
                Login here
            </RouterLink>
        </p>

    </div>
</template>