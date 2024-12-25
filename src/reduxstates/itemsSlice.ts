import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchItems, addItem, deleteItem, updateItem } from '../apis/Sample';

interface Item {
    id: number;
    name: string;
}

interface ItemsState {
    items: Item[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchItemsAsync = createAsyncThunk('items/fetchItems', async () => {
    const response = await fetchItems();
    return response;
});

export const addItemAsync = createAsyncThunk('items/addItem', async (item: { name: string }) => {
    const response = await addItem(item);
    return response;
});

export const deleteItemAsync = createAsyncThunk('items/deleteItem', async (id: number) => {
    await deleteItem(id);
    return id;
});

export const updateItemAsync = createAsyncThunk('items/updateItem', async (item: { id: number; name: string }) => {
    const response = await updateItem(item);
    return response;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItemsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItemsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items';
            })
            .addCase(addItemAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteItemAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(updateItemAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index >= 0) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default itemsSlice.reducer;
