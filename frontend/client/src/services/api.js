// frontend/client/src/services/api.js
const API_URL = 'http://localhost:8000/api';

export const productAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/products/`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        return { data };
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/products/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        return { data };
    }
};

export default { productAPI };