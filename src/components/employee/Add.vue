<template>
    <div class="shadow-md pb-6">
      <div class="heading">
        <p>Add Employee</p>......
      </div>
  
      <div class="my-container mx-32px 25px px-4 py-8">
        <!-- Loader -->
        <!-- <div v-if="isLoading" class="loader-container items-center">
          <div class="loader"></div>
        </div> -->
  
        <!-- Employee Form -->
        <form @submit.prevent="handleAddEmployeeForm" class="w-full" id="AddEmployeeForm">
          <!-- Employee ID -->
          <div class="flex items-center m-6">
            <div class="w-1/5">
              <label class="font-medium" for="eid"> Employee ID: </label>
            </div>
            <div class="w-4/5">
              <input type="text" id="eid" v-model.trim="formData.eid" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="Write employee's ID" required />
            </div>
          </div>
          <!-- Employee Name -->
          <div class="flex items-center m-6">
            <div class="w-1/5">
              <label class="font-medium" for="empname"> Name: </label>
            </div>
            <div class="w-4/5">
              <input type="text" id="empname" v-model.trim="formData.empname" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="Write employee's name" required />
            </div>
          </div>
          <!-- Employee Email -->
          <div class="flex items-center m-6">
            <div class="w-1/5">
              <label class="font-medium" for="email"> Email: </label>
            </div>
            <div class="w-4/5">
              <input type="email" id="email" v-model.trim="formData.email" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="Write employee's email" required />
            </div>
          </div>
          <!-- Employee Phone -->
          <div class="flex items-center m-6">
            <div class="w-1/5">
              <label class="font-medium" for="empphone"> Phone No.: </label>
            </div>
            <div class="w-4/5">
              <input type="text" id="empphone" v-model.trim="formData.empphone" @input="validatePhoneNumber" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="Write employee's phone" required />
            </div>
          </div>
          <!-- Employee Role -->
          <div class="flex items-center m-6">
            <div class="w-1/5">
              <label class="font-medium" for="role"> Role: </label>
            </div>
            <div class="w-4/5">
              <select id="role" v-model="formData.role" class="border-2 border-gray-200 w-full py-2 px-4" required>
                <option value="">Select Role</option>
                <option value="developer">Frontend Developer</option>
                <option value="designer">Backend Developer</option>
                <option value="designer">Mobile App Developer</option>
                <option value="designer">ui/ux Developer</option>
                <option value="designer">Frontend Designer</option>
              </select>
            </div>
          </div>
          <!-- Submit Button -->
          <div class="m-8 flex justify-center">
            <button type="submit" class="bg-blue-600 text-white font-medium py-2 rounded-md px-6 hover:bg-blue-600 mr-6">
              Add
            </button>
            <!-- Router Link -->
            <RouterLink :to="{ name: 'list' }">
              <button type="button" class="bg-blue-600 text-white font-medium p-2 rounded-md hover:bg-blue-600">
                Back to Home
              </button>
            </RouterLink>
          </div>
        </form>
  
        <!-- Error Message -->
        <div v-if="error" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-medium" role="alert">
          Oops! Error encountered: {{ error }}
        </div>
        <!-- Success Message -->
        <div v-if="statusCode === 201" class="p-4 mb-4 text-sm text-green-800 bg-green-50 rounded-lg font-medium" role="alert">
          Employee Added Successfully
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from "vue";
  import { RouterLink } from "vue-router";
  import useEmployee from "../../composables/employeeApi.js";
  import { useStore } from "vuex";
  
  export default {
    components: {
      RouterLink,
    },
    setup() {
      const { employeeData, error, statusCode, createEmployee } = useEmployee();
      const store = useStore();
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
          return;
        }
  
        const employeeExists = employeeData.value.some(emp => emp.id === formData.eid);
        if (employeeExists) {
          error.value = "Employee with the same ID already exists. Please choose a unique ID.";
          return;
        }
  
        // isLoading.value = true;
  
        // await new Promise(resolve => setTimeout(resolve, 4000));
  
        await createEmployee(formData);
        if (statusCode.value === 201) {
          document.getElementById("AddEmployeeForm").reset();
        }
  
        // isLoading.value = false;
      };
  
      return {
        formData,
        error,
        statusCode,
        handleAddEmployeeForm,
        validatePhoneNumber,
      };
    },
  };
  </script>
  
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


  </style>
  