import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Create User
export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    try {
        const response = await fetch("https://64d3244967b2662bf3dbb8a0.mockapi.io/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Update User
export const updateUser = createAsyncThunk("updateuser", async (data, { rejectWithValue }) => {
    console.log("Updated Date", data)
    try {
        const response = await fetch(`https://64d3244967b2662bf3dbb8a0.mockapi.io/users/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Read User
export const readUser = createAsyncThunk("readUser", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("https://64d3244967b2662bf3dbb8a0.mockapi.io/users");
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Delete User
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://64d3244967b2662bf3dbb8a0.mockapi.io/users/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        return { id, result };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const userDetail = createSlice({
    name: "UserDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create user
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Read User
            .addCase(readUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(readUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(readUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.users = state.users.filter((data) => data.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((element) => element.id === action.payload.id ? action.payload : element)
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default userDetail.reducer;
