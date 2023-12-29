import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './authActions';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    token,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      //console.log(payload.existingUser);
      state.user = payload.existingUser;
      state.token = payload.token;
    });

    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default authSlice;
