<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const workouts = ref([]);
const message = ref("");


// GET MY WORKOUTS
const getWorkouts = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        router.push("/login");
        return;
    }

    try {

        const response = await fetch(
            "https://fitnessapi-cabanisan-2.onrender.com/workouts/getMyWorkouts",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            message.value =
                data.message || "Failed to get workouts";
            return;
        }

        workouts.value = data.workouts;

    } catch (error) {

        console.error(error);
        message.value = "Something went wrong";

    }
};

// COMPLETE WORKOUT
const completeWorkout = async (id) => {
    try {
        const response = await fetch(
            "https://fitnessapi-cabanisan-2.onrender.com/workouts/completeWorkoutStatus",
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },

                body: JSON.stringify({
                    workoutId: id
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return;
        }

        console.log(data);

        // Refresh the workout list
        getWorkouts();

    } catch (error) {
        console.error("Complete workout error:", error);
    }
};


// DELETE WORKOUT
const deleteWorkout = async (workoutId) => {

    const confirmDelete = confirm(
        "Are you sure you want to delete this workout?"
    );

    if (!confirmDelete) {
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        router.push("/login");
        return;
    }

    try {

        const response = await fetch(
            `https://fitnessapi-cabanisan-2.onrender.com/workouts/deleteWorkout/${workoutId}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            message.value =
                data.message || "Failed to delete workout";

            return;
        }

        message.value =
            "Workout deleted successfully!";

        getWorkouts();

    } catch (error) {

        console.error("Delete workout error:", error);

        message.value =
            "Something went wrong";

    }

};

// LOGOUT
const logout = () => {

    localStorage.removeItem("token");

    window.dispatchEvent(new Event("auth-change"));

    router.push("/login");

};

// LOAD WORKOUTS WHEN PAGE OPENS
onMounted(() => {

    getWorkouts();

});
</script>


<template>

    <div class="container">

        <div class="workouts-header">

            <h1>My Workouts</h1>

            <RouterLink
                to="/addWorkouts"
                class="add-workout-btn"
            >
                + Add Workout
            </RouterLink>

        </div>

        <!-- MESSAGE -->
        <p class="message">
            {{ message }}
        </p>

        <!-- NO WORKOUTS -->
        <div
            v-if="workouts.length === 0"
            class="no-workouts"
        >
            No workouts found.
        </div>

        <!-- WORKOUT LIST -->
        <div
            v-for="workout in workouts"
            :key="workout._id"
            class="workout-card"
        >

            <h3>
                {{ workout.name }}
            </h3>

            <p>
                <strong>Duration:</strong>
                {{ workout.duration }}
            </p>

            <p>
                <strong>Status:</strong>
                {{ workout.status }}
            </p>

            <div class="workout-actions">

                <button
                    v-if="workout.status !== 'completed'"
                    class="complete-btn"
                    @click="completeWorkout(workout._id)"
                >
                    Mark as Completed
                </button>

                <RouterLink
                    :to="{
                        path: `/updateWorkout/${workout._id}`,
                        query: {
                            name: workout.name,
                            duration: workout.duration
                        }
                    }"
                >
                    <button class="edit-btn">
                        Edit Workout
                    </button>
                </RouterLink>

                <button
                    class="delete-btn"
                    @click="deleteWorkout(workout._id)"
                >
                    Delete Workout
                </button>

            </div>

        </div>

    </div>

</template>