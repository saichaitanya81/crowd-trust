import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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

// Helper wrapper to ensure consistent response structure { data: { success: true, data: ... } }
export const adminService = {
  getStats: () => api.get('/admin/stats').then(res => ({ data: res.data || res })),
  getVerifications: (status) => api.get('/admin/verifications', { params: { status } }).then(res => ({ data: res.data || res })),
  reviewVerification: (id, payload) => api.patch(`/admin/verifications/${id}`, payload).then(res => ({ data: res.data || res })),
  getCampaigns: (params) => api.get('/admin/campaigns', { params }).then(res => ({ data: res.data || res })),
  reviewCampaign: (id, payload) => api.patch(`/admin/campaigns/${id}`, payload).then(res => ({ data: res.data || res })),
  getMilestones: (params) => api.get('/admin/milestones', { params }).then(res => ({ data: res.data || res })),
  reviewMilestone: (id, payload) => api.patch(`/admin/milestones/${id}`, payload).then(res => ({ data: res.data || res })),
  getExpenses: (params) => api.get('/admin/expenses', { params }).then(res => ({ data: res.data || res })),
  reviewExpense: (id, payload) => api.patch(`/admin/expenses/${id}`, payload).then(res => ({ data: res.data || res })),
  getReports: (params) => api.get('/admin/reports', { params }).then(res => ({ data: res.data || res })),
  resolveReport: (id, payload) => api.patch(`/admin/reports/${id}`, payload).then(res => ({ data: res.data || res })),
  getUsers: (params) => api.get('/admin/users', { params }).then(res => ({ data: res.data || res })),
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
