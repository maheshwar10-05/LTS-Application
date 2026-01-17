import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (data) => api.post('/auth/register', data),
};

export const productService = {
    getAll: (category) => api.get('/products', { params: { category } }),
    getFeatured: () => api.get('/products/featured'),
    getById: (id) => api.get(`/products/${id}`),
};

export const cartService = {
    get: () => api.get('/cart'),
    add: (productId, quantity) => api.post('/cart', { productId, quantity }),
    remove: (itemId) => api.delete(`/cart/${itemId}`),
};

export default api;
