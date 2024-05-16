<script setup>
import useEmployee from "../../composables/employeeApi";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const { employeeData, error, getSingleEmployee } = useEmployee();
const route = useRoute();
const store = useStore();
onMounted(() => {
  getSingleEmployee(route.params.id);
})
</script>
 
<template>
<div class="shadow-md pb-6">
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
<table class="table-auto w-full" v-else-if="employeeData">
<thead class="bg-slate-600 text-white text-center">
<tr>
<th class="py-1">ID</th>
<th class="py-1">Name</th>
<th class="py-1">Email</th>
<th class="py-1">Phone No.</th>
<th class="py-1">Role</th>
</tr>
</thead>
<tbody class="text-center">
<tr>
<td class="py-2">{{ employeeData.id }}</td>
<td class="py-2">{{ employeeData.empname }}</td>
<td class="py-2">{{ employeeData.email }}</td>
<td class="py-2">{{ employeeData.empphone }}</td>
<td class="py-2">{{ employeeData.role }}</td>
</tr>
</tbody>
</table>
<div class="m-8 flex justify-center">
<RouterLink :to="{ name: 'list' }">
<button
          type="button"
          class="bg-blue-600 text-white font-medium p-2 rounded-md hover:bg-blue-600"
>
          Back to Home
</button>
</RouterLink>
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
