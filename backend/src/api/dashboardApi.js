import axios from 'axios';

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here later for attaching JWT tokens

export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data; // This returns the JSON response from your Express controller
  } catch (error) {
    console.error("Error fetching dashboard data", error);
    throw error; 
  }
};