import axios from 'axios';

// Create an Axios instance pointing to your backend port
const apiClient = axios.create({
  baseURL: 'https://hospital-management-system-tt4o.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data; 
  } catch (error) {
    console.error("Error fetching dashboard data", error);
    throw error; 
  }
};
export const registerNewPatient = async (patientData) => {
  try {
    // The apiClient was defined in your earlier steps
    const response = await apiClient.post('/patients', patientData);
    return response.data;
  } catch (error) {
    console.error("Error registering patient", error);
    throw error;
  }
};