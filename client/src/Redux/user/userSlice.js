import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

export const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        signInstart: (state) => {
            state.loading = true,
            state.error = null
        },

        signInSuccess: (state, action) => {
            state.loading = false,
            state.currentUser = action.payload,
            state.error = null
        },

        signInFailure: (state,action) => {
            state.currentUser = null,
            state.loading = false,
            state.error = action.payload
        },

        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }

    },
});

export const { signInstart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure } = userSlice.actions;

export default userSlice.reducer;