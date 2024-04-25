<script setup>
import { reactive } from "vue";
import { RouterLink } from "vue-router";
import useEmployee from "../../composables/employeeApi";
const { employeeData, error, statusCode, createEmployee } = useEmployee();
const formData = reactive({
  empname: "",
  email: "",
});
const validatePhoneNumber = () => {
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  if (!phoneRegex.test(formData.empphone)) {
    error.value = "Invalid phone number";
  } else {
    error.value = "";
  }
};
const handleAddEmployeeForm = async () => {
  validatePhoneNumber(); // validate phone number before form submission
  if (!error.value) { // only submit the form if there's no error
    await createEmployee(formData);
    if (statusCode.value === 201) {
      document.getElementById("AddEmployeeForm").reset();
    }
  }
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
    <form
      @submit.prevent="handleAddEmployeeForm"
      class="w-full"
      id="AddEmployeeForm"
    >

    <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium" for="eid"> Employee ID: </label>
        </div>
        <div class="w-4/5">
          <input
            type="eid"
            id="eid"
            v-model.trim="formData.eid"
            class="border-2 border-gray-200 w-full py-2 px-4"
            placeholder="write employee's ID"
            required
          />
        </div>
      </div>
      <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium" for="empname"> Name : </label>
        </div>
        <div class="w-4/5">
          <input
            type="text"
            id="empname"
            v-model.trim="formData.empname"
            class="border-2 border-gray-200 w-full py-2 px-4"
            placeholder="write employee's name"
            required
          />
        </div>
      </div>
      <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium" for="email"> Email : </label>
        </div>
        <div class="w-4/5">
          <input
            type="email"
            id="email"
            v-model.trim="formData.email"
            class="border-2 border-gray-200 w-full py-2 px-4"
            placeholder="write employee's email"
            required
          />
        </div>
      </div>
      <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium" for="empphone"> Phone No. : </label>
        </div>
        <div class="w-4/5">
          <input
            type="text"
            id="empphone"
            v-model.trim="formData.empphone"
            @input="validatePhoneNumber"
            class="border-2 border-gray-200 w-full py-2 px-4"
            placeholder="write employee's phone"
            required
          />
        </div>
      </div>
      

      <div class="m-8 flex justify-center">
        <button
          type="submit"
          class="bg-purple-700 text-white font-medium py-2 rounded-md px-6 hover:bg-purple-800 mr-6"
        >
          Add
        </button>

        <RouterLink :to="{ name: 'list' }">
          <button
            type="button"
            class="bg-emerald-700 text-white font-medium p-2 rounded-md hover:bg-emerald-800"
          >
            Back to Home
          </button>
        </RouterLink>
      </div>
    </form>
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-medium"
      role="alert"
      v-if="error"
    >
      Oops! Error encountered: {{ error.message }}
    </div>
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-medium"
      role="alert"
      v-if="statusCode === 201"
    >
      Employee Added Successfully
    </div>
  </div>

</div>
</template>

<style scoped>
.heading{
  display: flex;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
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
</style>
