<script setup>
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon
} from "@heroicons/vue/24/solid";
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import useEmployee from "../../composables/employeeApi";
import router from "../../router";
import { useStore } from "vuex";
// const router = useRouter()
 
const {
  employeeData,
  error,
  statusCode,
  delError,
  getAllEmployee,
  destroyEmployee,
} = useEmployee();
const store = useStore();
 
 
const deleteEmployee = async (id) => {
  if (!window.confirm("Are you sure ?")) {
    return;
  }
  await destroyEmployee(id);
  await getAllEmployee();
};
 
onMounted(() => {
  let user = localStorage.getItem('user.info');
  if (!user) {
    router.push({ name: 'SignUp' });
  }
});
 
onMounted(getAllEmployee);
</script>
 
 
<template>
  <div>
      <div class="heading">
        <p>
          Employee Details
        </p>
      </div>
    <div class="my-container mx-32px 25px px-4 py-8">
      <!-- <div v-if="isLoading" class="loader"></div> -->
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-medium"
      role="alert"
      v-if="error"
    >
      Oops! Error encountered: {{ error.message }}
    </div>
   
    <table class="table-auto w-full rounded-lg" v-else-if="employeeData">
      <thead class="bg-slate-600 text-white text-center ">
        <tr>
         
          <th class="py-1">No</th>
          <th class="py-1">Employee ID</th>
          <th class="py-1">Name</th>
          <th class="py-1">Email</th>
          <th class="py-1">Phone</th>
          <th class="py-1">Role</th>
          <th class="py-1">Action</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="({ id, eid, empname, email, empphone, role }, i) in employeeData" :key="id">
          <td class="py-2">{{ ++i }}</td>
          <td class="py-2">{{ eid }}</td>
          <td class="py-2">{{ empname }}</td>
          <td class="py-2">{{ email }}</td>
          <td class="py-2">{{ empphone }}</td>
          <td class="py-2">{{ role }}</td>
          <td class="py-2">
            <RouterLink :to="{ name: 'view', params: { id: id } }">
              <EyeIcon class="text-blue-500 h-6 w-6 inline" />
            </RouterLink>
            <RouterLink :to="{ name: 'edit', params: { id: id } }">
              <PencilIcon class="text-emerald-500 h-6 w-6 inline mx-6" />
            </RouterLink>
            <TrashIcon
              class="text-red-500 h-6 w-6 inline cursor-pointer"
              @click="deleteEmployee(id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-medium"
      role="alert"
      v-if="delError"
    >
      Unable to Delete Employee: {{ delError.message }}
    </div>
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-medium"
      role="alert"
      v-if="statusCode === 200"
    >
      Employee Deleted Successfully
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
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; 
  animation: spin 2s linear infinite;
}


@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
} */

 
 
</style>