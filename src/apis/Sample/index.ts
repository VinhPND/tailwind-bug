//import axios from 'axios';
import { apiClient } from '../apiClient'

const API_URL = 'http://localhost:3000/items';


export const fetchItems = async () => {
    const response = await apiClient.get(API_URL);
    return response.data;
};

export const addItem = async (item: { name: string }) => {
    const response = await apiClient.post(API_URL, item);
    return response.data;
};

export const deleteItem = async (id: number) => {
    await apiClient.delete(`${API_URL}/${id}`);
};

export const updateItem = async (item: { id: number; name: string }) => {
    const response = await apiClient.put(`${API_URL}/${item.id}`, item);
    return response.data;
};
