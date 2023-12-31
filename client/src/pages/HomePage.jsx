import React from 'react';
import SpinnerLoader from '../components/shared/SpinnerLoader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../components/shared/layout/Layout';
import Modal from '../components/shared/modal/Modal';

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
      <h4
        className="ms-4"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ cursor: 'pointer' }}
      >
        <i className="fa-solid fa-plus text-success py-4"></i>
        Add Inventory
      </h4>
      <Modal />
    </Layout>
  );
};

export default HomePage;
