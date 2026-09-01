<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const duration = ref("");
const message = ref("");

const addWorkout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        router.push("/login");
        return;
    }

    try {
        const response = await fetch(
            "https://fitnessapi-cabanisan-2.onrender.com/workouts/addWorkout",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name.value,
                    duration: duration.value
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            message.value =
                data.message || "Failed to add workout";
            return;
        }

        message.value = "Workout added successfully!";

        setTimeout(() => {
            router.push("/workouts");
        }, 1000);

    } catch (error) {
        console.error(error);
        message.value = "Something went wrong";
    }
};
</script>

<template>
    <div class="page-container">

        <div class="form-container">

            <div class="form-header">
                <h1>Add Workout</h1>

                <RouterLink
                    to="/workouts"
                    class="back-link"
                >
                    ← Back to Workouts
                </RouterLink>
            </div>

            <form @submit.prevent="addWorkout">

                <div class="form-group">

                    <label>Workout Name</label>

                    <input
                        v-model="name"
                        type="text"
                        placeholder="Enter workout name"
                        required
                    >

                </div>

                <div class="form-group">

                    <label>Duration</label>

                    <input
                        v-model="duration"
                        type="text"
                        placeholder="Example: 30 mins"
                        required
                    >

                </div>

                <button
                    type="submit"
                    class="add-button"
                >
                    Add Workout
                </button>

            </form>

            <p
                v-if="message"
                class="message"
            >
                {{ message }}
            </p>

        </div>

    </div>
</template>

<style scoped>

.page-container {
    min-height: 100vh;
    padding: 40px 20px;
}

.form-container {
    max-width: 600px;
    margin: auto;
    padding: 35px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.form-header h1 {
    margin: 0;
}

.back-link {
    text-decoration: none;
}

.form-group {
    margin-bottom: 22px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 15px;
}

.add-button {
    padding: 12px 25px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 15px;
}

.message {
    margin-top: 20px;
}

</style>