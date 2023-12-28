import React from 'react';
import Form from '../../components/shared/form/Form';
const Login = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner col">
          <img className="img" src="/banner1.jpg" alt="banner1 image" />
        </div>
        <div className="col-md-4 form-container">
          <div className="container">
            <Form submitBtn={'Login'} formTitle="Login" formType="login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
