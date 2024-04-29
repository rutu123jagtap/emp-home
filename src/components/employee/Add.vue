<script>
import {
    reactive
} from "vue";
import {
    RouterLink
} from "vue-router";
import useEmployee from "../../composables/employeeApi";

export default {
    setup() {
        const {
            employeeData,
            error,
            statusCode,
            createEmployee
        } = useEmployee();
        const formData = reactive({
            eid: "",
            empname: "",
            email: "",
            empphone: "",
            role: "",
        });

        const validatePhoneNumber = () => {
            const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            if (!phoneRegex.test(formData.empphone)) {
                error.value = "Invalid phone number";
                console.log("Invalid phone number error set");
            } else {
                error.value = "";
            }
        };

        const handleAddEmployeeForm = async () => {
            validatePhoneNumber();
            if (error.value) {
                return; // Return early if there is an error
            }

            await createEmployee(formData);
            if (statusCode.value === 201) {
                document.getElementById("AddEmployeeForm").reset();
            }
        };

        return {
            formData,
            error,
            statusCode,
            handleAddEmployeeForm,
            validatePhoneNumber,
        };
    },
    components: {
        RouterLink,
    },
};
</script>

<template>
<div class="shadow-md pb-6">
    <!-- <div class="bg-indigo-600 p-4">
      <h1 class="text-3xl font-bold text-center text-white">Add Employee</h1>
    </div> -->

    <div class="heading">
        <p>
            Add Employee
        </p>
    </div>

    <div class="my-container mx-32px 25px px-4 py-8">
        <div v-if="isLoading" class="loader"></div>
        <form @submit.prevent="handleAddEmployeeForm" class="w-full" id="AddEmployeeForm">

            <div class="flex items-center m-6">
                <div class="w-1/5">
                    <label class="font-medium" for="eid"> Employee ID: </label>
                </div>
                <div class="w-4/5">
                    <input type="eid" id="eid" v-model.trim="formData.eid" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="write employee's ID" required />
                </div>
            </div>
            <div class="flex items-center m-6">
                <div class="w-1/5">
                    <label class="font-medium" for="empname"> Name : </label>
                </div>
                <div class="w-4/5">
                    <input type="text" id="empname" v-model.trim="formData.empname" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="write employee's name" required />
                </div>
            </div>
            <div class="flex items-center m-6">
                <div class="w-1/5">
                    <label class="font-medium" for="email"> Email : </label>
                </div>
                <div class="w-4/5">
                    <input type="email" id="email" v-model.trim="formData.email" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="write employee's email" required />
                </div>
            </div>
            <div class="flex items-center m-6">
                <div class="w-1/5">
                    <label class="font-medium" for="empphone"> Phone No. : </label>
                </div>
                <div class="w-4/5">
                    <input type="text" id="empphone" v-model.trim="formData.empphone" @input="validatePhoneNumber" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="write employee's phone" required />
                </div>
            </div>
            <div class="flex items-center m-6">
                <div class="w-1/5">
                    <label class="font-medium" for="role"> Role: </label>
                </div>
                <div class="w-4/5">
                    <select id="role" v-model="formData.role" class="border-2 border-gray-200 w-full py-2 px-4" required>
                        <option value="">Select Role</option>
                        <option value="developer">Web Developer</option>
                        <option value="designer">Web Designer</option>
                    </select>
                </div>
            </div>

            <div class="m-8 flex justify-center">
                <button type="submit" class="bg-blue-600 text-white font-medium py-2 rounded-md px-6 hover:bg-blue-600 mr-6">
                    Add
                </button>

                <RouterLink :to="{ name: 'list' }">
                    <button type="button" class="bg-blue-600 text-white font-medium p-2 rounded-md hover:bg-blue-600">
                        Back to Home
                    </button>
                </RouterLink>
            </div>
        </form>
        <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-medium" role="alert" v-if="error">
            Oops! Error encountered: {{ error }}
        </div>
        <div class="p-4 mb-4 text-sm text-green-800 bg-red-100 rounded-lg font-medium" role="alert" v-if="statusCode === 201">
            Employee Added Successfully
        </div>
    </div>
</div>
</template>

<style scoped>
.heading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 25px;
}

.my-container {
    max-width: 5xl;
    margin-left: 3rem;
    margin-right: 3rem;
    background-color: #ebe9e9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid blue;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
