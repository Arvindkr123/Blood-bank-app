import React from 'react';
import Form from '../../components/shared/form/Form';

const Register = () => {
  return (
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
  );
};

export default Register;
