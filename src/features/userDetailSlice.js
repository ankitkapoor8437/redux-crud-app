import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create Action
export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    const response = await fetch("https://64d311c367b2662bf3dba21c.mockapi.io/crud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

// Read Action
export const readUser = createAsyncThunk("readUser", async ({ rejectWithValue }) => {
    const response = await fetch("https://64d311c367b2662bf3dba21c.mockapi.io/crud");
    try {
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})


export const userDetail = createSlice({
    name: "User Detail",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [readUser.pending]: (state) => {
            state.loading = true;
        },
        [readUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },

        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },

    }
})

export default userDetail.reducer;