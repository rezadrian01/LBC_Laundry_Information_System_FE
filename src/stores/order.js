import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderTypeId: null,
        items: [],
        weight: 0,
        quantity: 0,
        services: []
    },
    reducers: {
        changeOrderType: (state, action) => {
            state.orderTypeId = action.payload;
        },
        addItem: (state, action) => {
            const { itemId, itemName, serviceName, servicePrice: price, itemServiceId } = action.payload;
            const newItem = {
                itemId,
                itemName,
                serviceName,
                itemServiceId,
                quantity: 1,
                price
            };
            const existingItemIndex = state.items.findIndex(item => item.itemServiceId === itemServiceId);
            if (existingItemIndex === -1) {
                state.items.push(newItem);
            } else {
                const currentItem = { ...state.items[existingItemIndex] };
                currentItem.quantity += 1;
                state.items[existingItemIndex] = currentItem;

            }
        },
        changeService: (state, action) => {
            const { prevServiceName, newItemServiceId, newItemServiceName, newItemServicePrice, itemId } = action.payload;
            const existingItemServiceIndex = state.items.findIndex(item => item.serviceName === prevServiceName);
            const { itemName, serviceName, itemServiceId, quantity, price } = state.items[existingItemServiceIndex];
            const updatedItemService = {
                itemId,
                itemName,
                serviceName: newItemServiceName,
                itemServiceId: newItemServiceId,
                quantity,
                price: newItemServicePrice
            };
            state.items[existingItemServiceIndex] = updatedItemService;

        },
        incrementItemQuantity: (state, action) => {
            const existingItemServiceIndex = state.items.findIndex(item => item.itemServiceId === action.payload.itemServiceId);
            if (existingItemServiceIndex === -1) return;
            const currentItem = { ...state.items[existingItemServiceIndex] };
            currentItem.quantity += 1;
            state.items[existingItemServiceIndex] = currentItem;
        },
        decrementItemQuantity: (state, action) => {
            const existingItemServiceIndex = state.items.findIndex(item => item.itemServiceId === action.payload.itemServiceId);
            if (existingItemServiceIndex === -1) return;
            const currentItem = { ...state.items[existingItemServiceIndex] };
            if (currentItem.quantity === 1) {
                state.items = state.items.filter(item => item.itemServiceId !== action.payload.itemServiceId);
            } else {
                currentItem.quantity -= 1;
                state.items[existingItemServiceIndex] = currentItem;
            }
        },
        addWeight: (state, action) => {
            state.weight = action.payload.weight;
        },
        addTotalItems: (state, action) => {
            state.quantity += action.payload.quantity;
        },
        addWeightAndQuantity: (state, action) => {
            state.quantity = action.payload.quantity;
            state.weight = action.payload.weight;
        },
        resetOrder: (state, action) => {
            state.orderTypeId = null;
            state.items = [];
            state.weight = 0;
            state.quantity = 0;
            state.services = [];
        },
        addService: (state, action) => {
            state.services.push({ serviceId: action.payload.serviceId });
        },
        removeService: (state, action) => {
            state.services = state.services.filter(service => service.serviceId !== action.payload.serviceId);
        },
    }
});

export const orderAction = orderSlice.actions;