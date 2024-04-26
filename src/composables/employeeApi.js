import { ref } from 'vue'
import axios from 'axios'

export default function useEmployee() {
  const url = "http://localhost:4000/employee/"
  const employeeData = ref([])
  const error = ref(null)
  const statusCode = ref(null)
  const delError = ref(null)
  // Get All Employee Data
  const getAllEmployee = async () => {
    employeeData.value = []
    error.value = null
    try {
      const admin = JSON.parse(localStorage.getItem('user.info'));
      const res = await axios(`${url}?is_deleted=0&added_by=${admin.id}`)
      employeeData.value = res.data
    } catch (err) {
      // console.log(err)
       
      error.value = err
    }
  }
  // Get Single Employee Data
  const getSingleEmployee = async (id) => {
    employeeData.value = []
    error.value = null
    try {
      const res = await axios.get(url + id)
      employeeData.value = res.data
    } catch (err) {
      error.value = err
    }
  }

  // Post Employee Data
  const createEmployee = async (formData) => {
    formData.is_deleted = 0;
    const admin = JSON.parse(localStorage.getItem('user.info'));
    formData.added_by = admin.id;
    formData.admin_name = admin.name; 
    formData.created_at = new Date().toISOString();
    employeeData.value = []
    error.value = null
    try {
      const config = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData)
      }
      const res = await axios(config)
      employeeData.value = res.data
      statusCode.value = res.status
    } catch (err) {
      error.value = err
    }
  }

  // Update Employee Data
  const updateEmployee = async (id, data) => {
    const admin = JSON.parse(localStorage.getItem('user.info'));
    data.updated_by = admin.name;
    data.updated_at = new Date().toISOString();
    employeeData.value = []
    error.value = null
    try {
      const config = {
        method: 'PUT',
        url: url + id,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      }
      const res = await axios(config)
      employeeData.value = res.data
      statusCode.value = res.status
    } catch (err) {
      error.value = err
    }
  }

  // Delete Employee Data
  const destroyEmployee = async (id) => {
    employeeData.value = []
    error.value = null
    try {
      const config = {
        method: 'PATCH',
        url: url + id,
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          is_deleted: 1
        }
      }
      const res = await axios(config)
      statusCode.value = res.status
    } catch (err) {
      delError.value = err
    }
  }
  return {
    employeeData,
    error,
    statusCode,
    delError,
    getAllEmployee,
    getSingleEmployee,
    createEmployee,
    updateEmployee,
    destroyEmployee
  }
}