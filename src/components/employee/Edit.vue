<script setup>
import { onMounted } from "vue";
import useEmployee from "../../composables/employeeApi";
import { useRoute } from "vue-router";
const { employeeData, error, statusCode, getSingleEmployee, updateEmployee } =
  useEmployee();
const { params } = useRoute();
onMounted(() => {
  getSingleEmployee(params.id);
});

function handleUpdateEmployeeForm() {
  updateEmployee(params.id, employeeData.value);
}
</script>

<template>
  <div class="shadow-md pb-6">
    <div class="bg-indigo-600 p-4">
      <h1 class="text-3xl font-bold text-center text-white">Edit Employee</h1>
    </div>
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
            id="empid"
            class="border-2 border-gray-200 w-full py-2 px-4"
            readonly
            disabled
            v-model.trim="employeeData.id"
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

      <div class="m-8 flex justify-center">
        <button
          type="submit"
          class="bg-purple-700 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-800 mr-5"
        >
          Save
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
      v-if="statusCode === 200"
    >
      Employee Updated Successfully
    </div>
  </div>
</template>

<style scoped></style>
