import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Workouts from "../views/Workouts.vue";
import AddWorkout from "../views/AddWorkout.vue";
import UpdateWorkout from "../views/UpdateWorkout.vue";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/workouts",
        component: Workouts
    },
    {
        path: "/addWorkouts",
        component: AddWorkout
    },
    {
        path: "/updateWorkout/:id",
        component: UpdateWorkout
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;