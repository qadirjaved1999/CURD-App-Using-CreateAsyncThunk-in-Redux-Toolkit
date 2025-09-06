import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   users: [],
   loading: false,
   error: null,
}

// Create Action
export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
   console.log("create user =====>>>  ", data)
   try {
      const response = await axios.post('https://68b47ed345c9016787708077.mockapi.io/crud', data, {
         headers: {
            "Content-Type": "application/json",
         },
      });
      const result = response.data
      console.log("=====>>>> result", result);
      return result;
   } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data || err.message);

   } finally {

   }
})

// Read Action
export const showUsers = createAsyncThunk("showUsers", async (_, { rejectWithValue }) => {
   try {

      const response = await axios.get('https://68b47ed345c9016787708077.mockapi.io/crud');
      console.log("response are you here => ", response)
      const result = response.data;
      console.log("are you get all user list => ", result);
      return result;

   } catch (error) {
      console.log(error);
      return rejectWithValue(error);
   }
})

// Delete Action
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
   try {

      const response = await axios.delete(`https://68b47ed345c9016787708077.mockapi.io/crud/${id}`);
      console.log("Deleted users response => ", response)
      const result = response.data;
      console.log("Deleted users here  => ", result);
      return result;

   } catch (error) {
      console.log(error);
      return rejectWithValue(error);
   }
})

// Update Action
export const updateUserRecord = createAsyncThunk("updateUserRecord", async (updatedUserData, { rejectWithValue }) => {
   console.log("updatedUserData inside the slice = ", updatedUserData)
   try {

      const response = await axios.put(`https://68b47ed345c9016787708077.mockapi.io/crud/${updatedUserData.id}`, updatedUserData, {
         headers: {
            "Content-Type": "application/json",
         },
      });
      console.log("updated users response => ", response)
      const result = response.data;
      console.log("updated users here  => ", result);
      return result;

   } catch (error) {
      console.log(error);
      return rejectWithValue(error);
   }
})

export const userDetails = createSlice({
   name: "userDetail",
   initialState,
   extraReducers: (builder) => {
      builder
         //   Create Users Case
         .addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
         })
         .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error?.message || "Request failed";
         })

         // showUsers cases
         .addCase(showUsers.pending, (state) => {
            state.loading = true;
         })
         .addCase(showUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
         })
         .addCase(showUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error?.message || "Request failed";
         })

         // DeleteUser cases
         .addCase(deleteUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(deleteUser.fulfilled, (state, action) => {
            console.log("Delete User payload", action.payload)
            state.loading = false;
            const { id } = action.payload;
            if (id) {
               state.users = state.users.filter((user) => user.id !== id);
            }
         })
         .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error?.message || "Request failed";
         })

         //   Update Users Case
         .addCase(updateUserRecord.pending, (state) => {
            state.loading = true;
         })
         .addCase(updateUserRecord.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map((user) => user.id === action.payload.id ? action.payload : user )
         })
         .addCase(updateUserRecord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error?.message || "Request failed";
         })
   },
})

export default userDetails.reducer