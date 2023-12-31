import React, { useState } from 'react';
import InputType from '../form/InputType';
import { toast } from 'react-toastify';
import API from './../../../services/API';
import { useSelector } from 'react-redux';

const Modal = () => {
  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [donarEmail, setDonarEmail] = useState('');
  const { user } = useSelector((state) => state.auth);

  // handle modal data
  const handleModalData = async (e) => {
    e.preventDefault();
    try {
      if (!bloodGroup || !quantity) {
        toast.error('please provide all fields');
      }
      const { data } = await API.post('/inventory/create-inventory', {
        donarEmail,
        email: user?.email,
        organization: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });

      if (data?.success) {
        toast.success('New Record created successfully');
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
      alert(error.response.data.message);
      // console.log(error);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mb-2">
                Blood Type : &nbsp;
                <div className="form-check ms-2">
                  <input
                    type="radio"
                    name="radioIn"
                    className="form-check-input"
                    value="in"
                    defaultChecked
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="in" className="form-check-label">
                    IN
                  </label>
                </div>
                <div className="form-check ms-2">
                  <input
                    type="radio"
                    name="radioIn"
                    className="form-check-input"
                    value="out"
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="out" className="form-check-label">
                    OUT
                  </label>
                </div>
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue={'select bood group'}>
                  select bood group
                </option>
                {['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'].map(
                  (ele, i) => {
                    return (
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    );
                  }
                )}
              </select>
              <InputType
                inputType="email"
                value={donarEmail}
                name="donarEmail"
                onChange={(e) => setDonarEmail(e.target.value)}
                labelText={
                  inventoryType === 'out' ? 'Hospital Email' : 'Donar Email'
                }
                labelFor="donarEmail"
              />
              <InputType
                inputType="number"
                value={quantity}
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                labelText="Quantity (ML)"
                labelFor="quantity"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalData}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
