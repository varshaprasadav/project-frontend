# Centralized API Usage Guide

## Overview
All frontend API calls should now use the centralized `services/api.js` file instead of making direct fetch calls throughout the application.

## Setup

The API file is located at: `src/services/api.js`

## Usage Examples

### Authentication
```javascript
import { authAPI } from '../services/api';

// Login
const result = await authAPI.login(email, password);
if (result.success) {
  // Login successful
  console.log(result.data);
}

// Logout
await authAPI.logout();

// Get current user profile
const profile = await authAPI.getProfile();

// Signup
const signupResult = await authAPI.signup(userData);
```

### Plans
```javascript
import { plansAPI } from '../services/api';

// Get all plans
const plans = await plansAPI.getAllPlans();

// Get user's plans
const userPlans = await plansAPI.getUserPlans();

// Buy a plan
await plansAPI.buyPlan(planId);

// Create a new plan (admin)
await plansAPI.createPlan(planData);

// Update a plan
await plansAPI.updatePlan(planId, updatedData);
```

### Bookings
```javascript
import { bookingsAPI } from '../services/api';

// Get all user bookings
const bookings = await bookingsAPI.getUserBookings();

// Book a class
await bookingsAPI.bookClass(classData);

// Cancel a booking
await bookingsAPI.cancelBooking(bookingId);
```

### Offline Plans
```javascript
import { offlinePlansAPI } from '../services/api';

// Get all offline plans
const plans = await offlinePlansAPI.getAllOfflinePlans();

// Enroll in an offline plan
await offlinePlansAPI.enrollOfflinePlan(planId);
```

### Admin
```javascript
import { adminAPI } from '../services/api';

// Get dashboard data
const dashboard = await adminAPI.getDashboard();

// Get all users
const users = await adminAPI.getUsers();

// Get analytics
const analytics = await adminAPI.getAnalytics();
```

## Response Format

All API calls return a response object with the following structure:

```javascript
{
  success: boolean,      // true if successful, false if error
  data: any,            // Response data from server (if successful)
  error: string,        // Error message (if failed)
  status: number        // HTTP status code
}
```

## Error Handling

```javascript
const result = await authAPI.login(email, password);

if (result.success) {
  // Handle success
  console.log('Logged in:', result.data);
} else {
  // Handle error
  console.error('Login failed:', result.error);
}
```

## Features

✅ Centralized configuration
✅ Automatic credential handling (cookies)
✅ Consistent error handling
✅ Built-in JSON content-type header
✅ Easy to maintain and update

## Adding New Endpoints

To add a new endpoint, simply add it to the appropriate API section in `api.js`:

```javascript
export const newAPI = {
  getItem: () =>
    apiFetch('/route/get'),

  createItem: (data) =>
    apiFetch('/route/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
```
