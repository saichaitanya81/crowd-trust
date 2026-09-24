import axios from 'axios';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    let url = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
    if (!url.endsWith('/api')) {
      url += '/api';
    }
    return url;
  }

  // If in browser and deployed on non-localhost domain (e.g. Vercel)
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return 'https://crowd-trust.onrender.com/api';
  }

  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token from localStorage if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crowdtrust_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: automatically unwrap response data and standardize errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';
    const customError = new Error(message);
    customError.response = error.response;
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    return Promise.reject(customError);
  }
);

// Helper wrapper to ensure consistent response structure { data: { success: true, data: ... } }
export const adminService = {
  getStats: () => api.get('/admin/stats').then((res) => ({ data: res })),
  getVerifications: (status) => api.get('/admin/verifications', { params: { status } }).then((res) => ({ data: res })),
  reviewVerification: (id, payload) => api.patch(`/admin/verifications/${id}`, payload).then((res) => ({ data: res })),
  getCampaigns: (params) => api.get('/admin/campaigns', { params }).then((res) => ({ data: res })),
  reviewCampaign: (id, payload) => api.patch(`/admin/campaigns/${id}`, payload).then((res) => ({ data: res })),
  getMilestones: (params) => api.get('/admin/milestones', { params }).then((res) => ({ data: res })),
  reviewMilestone: (id, payload) => api.patch(`/admin/milestones/${id}`, payload).then((res) => ({ data: res })),
  getExpenses: (params) => api.get('/admin/expenses', { params }).then((res) => ({ data: res })),
  reviewExpense: (id, payload) => api.patch(`/admin/expenses/${id}`, payload).then((res) => ({ data: res })),
  getReports: (params) => api.get('/admin/reports', { params }).then((res) => ({ data: res })),
  resolveReport: (id, payload) => api.patch(`/admin/reports/${id}`, payload).then((res) => ({ data: res })),
  getUsers: (params) => api.get('/admin/users', { params }).then((res) => ({ data: res })),
};

export const campaignService = {
  getAll: (params) => api.get('/campaigns', { params }),
  getById: (id) => api.get(`/campaigns/${id}`),
  create: (data) => api.post('/campaigns', data),
  update: (id, data) => api.put(`/campaigns/${id}`, data),
  delete: (id) => api.delete(`/campaigns/${id}`),
};

export const donationService = {
  create: (data) => api.post('/donations', data),
  confirm: (id, data) => api.post(`/donations/${id}/confirm`, data),
  getMyDonations: () => api.get('/donations/my-donations'),
};

export const aiService = {
  improve: (data) => api.post('/ai/improve', data),
  summarize: (data) => api.post('/ai/summarize', data),
  suggestCategory: (data) => api.post('/ai/suggest-category', data),
  riskAnalysis: (data) => api.post('/ai/risk-analysis', data),
};

export const notificationService = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
};

export default api;
