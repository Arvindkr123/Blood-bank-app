import React, { useState } from 'react';
import InputType from './InputType';
import { Link } from 'react-router-dom';
import { loginHandler, registerHandler } from '../../../services/authServices';

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState('donar');
  const [name, setName] = useState();
  const [orgnizationName, setOrgnizationName] = useState();
  const [hospitalName, setHospitalName] = useState();
  const [website, setWebsite] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  return (
    <div>
      <form
        onSubmit={
          formType === 'login'
            ? (e) => loginHandler(e, email, password, role)
            : (e) =>
                registerHandler(
                  e,
                  name,
                  role,
                  email,
                  password,
                  phone,
                  orgnizationName,
                  hospitalName,
                  website,
                  address
                )
        }
      >
        <h3 className="text-center">{formTitle}</h3>
        <hr />
        {/* adding other option as well */}
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              name="role"
              className="form-check-input"
              id="donarRadio"
              value={'donar'}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              name="role"
              className="form-check-input"
              id="adminRadio"
              value={'admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              name="role"
              className="form-check-input"
              id="organizationRadio"
              value={'organization'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organizationRadio" className="form-check-label">
              Organization
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              name="role"
              className="form-check-input"
              id="hospitalRadio"
              value={'hospital'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
        </div>
        {/* Switch Statement */}
        {(() => {
          switch (true) {
            case formType === 'login': {
              return (
                <>
                  <InputType
                    inputType={'email'}
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    labelText="Email"
                    labelFor="Email"
                  />
                  <InputType
                    inputType={'password'}
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    labelText="Password"
                    labelFor="Password"
                  />
                </>
              );
            }
            case formType === 'register': {
              return (
                <>
                  {(role === 'admin' || role === 'donar') && (
                    <InputType
                      inputType={'text'}
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      labelText="Name"
                      labelFor="name"
                    />
                  )}

                  {role === 'organization' && (
                    <InputType
                      inputType={'text'}
                      value={orgnizationName}
                      name="orgnizationName"
                      onChange={(e) => setOrgnizationName(e.target.value)}
                      labelText="Organization Name"
                      labelFor="orgnizationName"
                    />
                  )}
                  {role === 'hospital' && (
                    <InputType
                      inputType={'text'}
                      value={hospitalName}
                      name="hospitalName"
                      onChange={(e) => setHospitalName(e.target.value)}
                      labelText="Hospital Name"
                      labelFor="hospitalName"
                    />
                  )}
                  <InputType
                    inputType={'text'}
                    value={website}
                    name="website"
                    onChange={(e) => setWebsite(e.target.value)}
                    labelText="Website"
                    labelFor="website"
                  />
                  <InputType
                    inputType={'email'}
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    labelText="Email"
                    labelFor="Email"
                  />
                  <InputType
                    inputType={'password'}
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    labelText="Password"
                    labelFor="Password"
                  />
                  <InputType
                    inputType={'text'}
                    value={address}
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    labelText="Address"
                    labelFor="address"
                  />
                  <InputType
                    inputType={'number'}
                    value={phone}
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    labelText="Phone"
                    labelFor="phone"
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex justify-content-around">
          {formType === 'register' ? (
            <>
              <p>
                Already registered please login <Link to="/login"> here</Link>
              </p>
            </>
          ) : (
            <>
              <p>
                Not Registered yet ? Register <Link to="/register"> here</Link>
              </p>
            </>
          )}
          <button type="submit" className="btn btn-primary">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
