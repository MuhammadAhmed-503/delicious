import api from './api';

// Auth Services
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (userData) => api.post('/auth/signup', userData),
  getMe: () => api.get('/auth/me'),
};

// Menu Services
export const menuService = {
  getAllItems: (params) => api.get('/menu', { params }),
  getItem: (id) => api.get(`/menu/${id}`),
  createItem: (data) => api.post('/menu', data),
  updateItem: (id, data) => api.put(`/menu/${id}`, data),
  deleteItem: (id) => api.delete(`/menu/${id}`),
  getByCategory: (category) => api.get(`/menu/category/${category}`),
};

// Order Services
export const orderService = {
  createOrder: (data) => api.post('/orders', data),
  getAllOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, status),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
};

// Reservation Services
export const reservationService = {
  createReservation: (data) => api.post('/reservations', data),
  getAllReservations: () => api.get('/reservations'),
  getReservation: (id) => api.get(`/reservations/${id}`),
  updateReservationStatus: (id, status) => api.put(`/reservations/${id}`, status),
  cancelReservation: (id) => api.put(`/reservations/${id}/cancel`),
  deleteReservation: (id) => api.delete(`/reservations/${id}`),
};

// Gallery Services
export const galleryService = {
  getAllImages: (params) => api.get('/gallery', { params }),
  uploadImage: (data) => api.post('/gallery', data),
  deleteImage: (id) => api.delete(`/gallery/${id}`),
};

// User Services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  getOrders: () => api.get('/users/orders'),
  getReservations: () => api.get('/users/reservations'),
};

// Admin Services
export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getAllUsers: () => api.get('/admin/users'),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};
