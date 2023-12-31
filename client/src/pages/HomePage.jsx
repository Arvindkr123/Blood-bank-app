import React from 'react';
import SpinnerLoader from '../components/shared/SpinnerLoader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../components/shared/layout/Layout';

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  if (loading) {
    <SpinnerLoader></SpinnerLoader>;
  }
  if (error) {
    toast.error(error);
  }
  return (
    <Layout>
      <h1>Home page</h1>
    </Layout>
  );
};

export default HomePage;
