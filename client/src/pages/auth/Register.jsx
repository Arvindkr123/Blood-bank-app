import React from 'react';
import Form from '../../components/shared/form/Form';
import { useSelector } from 'react-redux';
import SpinnerLoader from '../../components/shared/SpinnerLoader';
import { toast } from 'react-toastify';

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  if (loading) {
    <SpinnerLoader />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="row g-0">
        <div className="col col-md-8 form-banner">
          <img src="/banner2.jpg" alt="register image" />
        </div>
        <div className="col col-md-4 form-container">
          <div className="container">
            <Form
              formTitle={'Register'}
              submitBtn={'Register'}
              formType="register"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
