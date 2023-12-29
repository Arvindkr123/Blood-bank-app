import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../services/API';
import { toast } from 'react-toastify';

// login
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/auth/login', { role, email, password });
      //console.log(data);
      if (data.success) {
        localStorage.setItem('token', data.token);
        toast.success(data.message);
        window.location.replace('/');
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// register
export const userRegister = createAsyncThunk(
  'auth/register',
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      orgnizationName,
      hospitalName,
      website,
      address,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post('/auth/register', {
        name,
        role,
        email,
        password,
        phone,
        orgnizationName,
        hospitalName,
        website,
        address,
      });
      if (data.success) {
        toast.success(data.message);
        window.location.replace('/login');
      }
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// current user
export const getCurrentUser = createAsyncThunk(
  'auth/currentUser',
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get('/auth/current-user');
      // console.log(res.data);
      if (res?.data) {
        return res?.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
