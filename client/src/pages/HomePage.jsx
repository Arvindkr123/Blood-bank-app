import React from 'react';
import SpinnerLoader from '../components/shared/SpinnerLoader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  if (loading) {
    <SpinnerLoader></SpinnerLoader>;
  }
  if (error) {
    toast.error(error);
  }
  return <div>HomePage</div>;
};

export default HomePage;
