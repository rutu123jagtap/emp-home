import { ref } from 'vue'
import axios from 'axios'

export default function useEmployee() {
  const url = "http://localhost:3333/employee/"
  const employeeData = ref([])
  const error = ref(null)
  const statusCode = ref(null)
  const delError = ref(null)
  // Get All Employee Data
  const getAllEmployee = async () => {
    employeeData.value = []
    error.value = null
    try {
      const res = await axios(url)
      // console.log(res.data)
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

  // Post/Add Employee Data
  const createEmployee = async (formData) => {
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
      // console.log(res)
      employeeData.value = res.data
      statusCode.value = res.status
    } catch (err) {
      error.value = err
    }
  }

  // Update Employee Data
  const updateEmployee = async (id, data) => {
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
        method: 'DELETE',
        url: url + id,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios(config)
      // console.log(res)
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