<script setup>
import { onMounted } from "vue";
import useEmployee from "../../composables/employeeApi";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const { employeeData, error, statusCode, getSingleEmployee, updateEmployee } =
  useEmployee();
  const store = useStore();
  
const { params } = useRoute();
onMounted(() => {
  getSingleEmployee(params.id);
});

function handleUpdateEmployeeForm() {
  updateEmployee(params.id, employeeData.value);
}
</script>

<template>
  <!-- <div v-if="isLoading" class="loader">Loading...</div> -->

  <div class="shadow-md pb-6">
    <!-- <div class="bg-indigo-600 p-4">
      <h1 class="text-3xl font-bold text-center text-white">Edit Employee</h1>
    </div> -->
    <div class="heading">
        <p>
          Edit Employee Details
        </p>
      </div>

      <div class="my-container mx-32px 25px px-4 py-8">
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-medium"
      role="alert"
      v-if="error"
    >
      Oops! Error encountered: {{ error.message }}
    </div>
    <form
      @submit.prevent="handleUpdateEmployeeForm"
      class="w-full"
      v-else-if="employeeData"
    >
    <div class="flex items-center m-6">
  <div class="w-1/5">
    <label class="font-medium" for="empid"> ID : </label>
  </div>
  <div class="w-4/5">
    <input
      type="text"
      eid="empid"
      class="border-2 border-gray-200 w-full py-2 px-4"
      readonly
      disabled
      :value="employeeData.eid" 
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
            class="border-2 border-gray-200 w-full py-2 px-4"
            required
            v-model.trim="employeeData.empname"
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
            class="border-2 border-gray-200 w-full py-2 px-4"
            required
            v-model.trim="employeeData.email"
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
            v-model.trim="employeeData.empphone"
            @input="validatePhoneNumber"
            class="border-2 border-gray-200 w-full py-2 px-4"
            placeholder="write employee's phone"
            required
          />
        </div>
      </div>
      <div class="flex items-center m-6">
          <div class="w-1/5">
            <label class="font-medium" for="role"> Role: </label>
          </div>
          <div class="w-4/5">
            <select
              id="role"
              v-model="employeeData.role"
              class="border-2 border-gray-200 w-full py-2 px-4"
              required
            >
              <option value="">Select Role</option>
              <option value="developer">Web Developer</option>
              <option value="designer">Web Designer</option>
            </select>
          </div>
        </div>

      <div class="m-8 flex justify-center">
        <button
          type="submit"
          class="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-600 mr-5"
        >
          Save
        </button>
        <RouterLink :to="{ name: 'list' }">
          <button
            type="button"
            class="bg-blue-600 text-white font-medium p-2 rounded-md hover:bg-blue-600"
          >
            Back to Home
          </button>
        </RouterLink>
      </div>
    </form>

    <div
      class="p-4 mb-4 text-sm text-green-600 bg-green-50 rounded-lg font-medium"
      role="alert"
      v-if="statusCode === 200"
    >
      Employee Updated Successfully
    </div>
  </div>
  </div>
</template>

<style scoped>
.heading{
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

/* .loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid blue;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
} */

</style>
