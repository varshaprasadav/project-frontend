// Centralized API configuration and methods
const API_BASE_URL = 'http://localhost:5000';

// Default fetch options with credentials included
const defaultOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Generic fetch wrapper for all API calls
 */
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Don't set Content-Type for FormData (browser will set it automatically)
  const isFormData = options.body instanceof FormData;
  
  const headers = isFormData 
    ? {} 
    : { ...defaultOptions.headers, ...options.headers };
  
  const config = {
    ...defaultOptions,
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Handle non-OK responses
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.msg || error.message || `API error: ${response.status}`);
    }

    // Try to parse JSON, fallback to empty object if response is empty
    const data = await response.json().catch(() => ({}));
    return { success: true, data, status: response.status };
  } catch (error) {
    console.error(`API call failed [${endpoint}]:`, error);
    return { success: false, error: error.message, status: null };
  }
};

// ============================================
// AUTH ENDPOINTS
// ============================================
export const authAPI = {
  login: (email, password) =>
    apiFetch('/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiFetch('/user/logout', {
      method: 'POST',
    }),

  signup: (userData) =>
    apiFetch('/user/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getProfile: () =>
    apiFetch('/user/me'),

  updateProfile: (profileData) =>
    apiFetch('/user/update', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
};

// ============================================
// PROFILE ENDPOINTS
// ============================================
export const profileAPI = {
  getProfile: (userName) =>
    apiFetch(`/api/profile/${userName}`),

  createProfile: (profileData) =>
    apiFetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    }),

  updateProfile: (profileData) =>
    apiFetch('/api/profile/update', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    }),

  deleteProfile: () =>
    apiFetch('/api/profile/delete', {
      method: 'DELETE',
    }),
};

// ============================================
// PLANS ENDPOINTS
// ============================================
export const plansAPI = {
  getAllPlans: () =>
    apiFetch('/user/plans/public'),

  getPlanById: (planId) =>
    apiFetch(`/admin/plans/id/${planId}`),

  createPlan: (planData) =>
    apiFetch('/plans/create', {
      method: 'POST',
      body: JSON.stringify(planData),
    }),

  updatePlan: (planId, planData) =>
    apiFetch(`/plans/update/${planId}`, {
      method: 'PUT',
      body: JSON.stringify(planData),
    }),

  deletePlan: (planId) =>
    apiFetch(`/plans/delete/${planId}`, {
      method: 'DELETE',
    }),

  getUserPlans: () =>
    apiFetch('/plans/user/my-plans'),

  buyPlan: (planId) =>
    apiFetch(`/user/subscribe/${planId}`, {
      method: 'POST',
    }),
};

// ============================================
// BOOKINGS ENDPOINTS
// ============================================
export const bookingsAPI = {
  getAllBookings: () =>
    apiFetch('/bookings'),

  getUserBookings: () =>
    apiFetch('/bookings/user'),

  bookClass: (classData) =>
    apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(classData),
    }),

  cancelBooking: (bookingId) =>
    apiFetch(`/bookings/${bookingId}`, {
      method: 'DELETE',
    }),

  getBookingById: (bookingId) =>
    apiFetch(`/bookings/${bookingId}`),
};

// ============================================
// OFFLINE PLANS ENDPOINTS
// ============================================
export const offlinePlansAPI = {
  getAllOfflinePlans: () =>
    apiFetch('/api/offline-plans'),

  getOfflinePlanById: (planId) =>
    apiFetch(`/api/offline-plans/${planId}`),

  createOfflinePlan: (planData) =>
    apiFetch('/api/offline-plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    }),

  updateOfflinePlan: (planId, planData) =>
    apiFetch(`/api/offline-plans/${planId}`, {
      method: 'PUT',
      body: JSON.stringify(planData),
    }),

  deleteOfflinePlan: (planId) =>
    apiFetch(`/api/offline-plans/${planId}`, {
      method: 'DELETE',
    }),

  enrollOfflinePlan: (planId) =>
    apiFetch('/api/offline-plans/enroll', {
      method: 'POST',
      body: JSON.stringify({ planId }),
    }),
};

// ============================================
// ADMIN ENDPOINTS
// ============================================
export const adminAPI = {
  getDashboard: () =>
    apiFetch('/admin/stats'),

  getUsers: () =>
    apiFetch('/admin/allUsers'),

  getUserDetails: (userId) =>
    apiFetch(`/admin/user/${userId}`),

  getBookings: () =>
    apiFetch('/admin/bookings'),

  getPlans: () =>
    apiFetch('/admin/plans'),

  addPlan: (planData) =>
    apiFetch('/admin/plans', {
      method: 'POST',
      body: planData instanceof FormData ? planData : JSON.stringify(planData),
    }),

  updatePlan: (planId, planData) =>
    apiFetch(`/admin/plans/${planId}`, {
      method: 'PUT',
      body: JSON.stringify(planData),
    }),

  deletePlan: (planId) =>
    apiFetch(`/admin/plans/${planId}`, {
      method: 'DELETE',
    }),

  getOfflinePlans: () =>
    apiFetch('/admin/offline-plans'),

  getAnalytics: () =>
    apiFetch('/admin/planAnalytics'),

  getWorkoutStats: () =>
    apiFetch('/admin/workoutStats'),

  deleteUser: (userName) =>
    apiFetch(`/admin/deleteUser/${userName}`, {
      method: 'DELETE',
    }),

  getUserProfile: (userName) =>
    apiFetch(`/admin/userProfile/${userName}`),
};

// ============================================
// EXERCISES ENDPOINTS
// ============================================
export const exercisesAPI = {
  getAllExercises: () =>
    apiFetch('/exercises/get'),

  getExerciseById: (exerciseId) =>
    apiFetch(`/exercises/${exerciseId}`),

  createExercise: (exerciseData) =>
    apiFetch('/exercises/create', {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    }),

  updateExercise: (exerciseId, exerciseData) =>
    apiFetch(`/exercises/update/${exerciseId}`, {
      method: 'PUT',
      body: JSON.stringify(exerciseData),
    }),

  deleteExercise: (exerciseId) =>
    apiFetch(`/exercises/delete/${exerciseId}`, {
      method: 'DELETE',
    }),
};

export default apiFetch;
