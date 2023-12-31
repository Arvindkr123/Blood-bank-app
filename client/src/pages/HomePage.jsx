import React, { useEffect, useState } from 'react';
import SpinnerLoader from '../components/shared/SpinnerLoader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../components/shared/layout/Layout';
import Modal from '../components/shared/modal/Modal';
import API from '../services/API';
import moment from 'moment';

const HomePage = () => {
  const [data, setData] = useState([]);
  // console.log(data);
  const { loading, error } = useSelector((state) => state.auth);
  if (loading) {
    <SpinnerLoader></SpinnerLoader>;
  }
  if (error) {
    toast.error(error);
  }

  const getBloodRecord = async () => {
    try {
      const { data } = await API.get('/inventory/get-inventory');

      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecord();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h4
          className="ms-4"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ cursor: 'pointer' }}
        >
          <i className="fa-solid fa-plus text-success py-4"></i>
          Add Inventory
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.bloodGroup}</td>
                  <td>{item.inventoryType}</td>
                  <td>{item.quantity} (ML)</td>
                  <td>{item.donarEmail}</td>
                  <td>{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal />
      </div>
    </Layout>
  );
};

export default HomePage;
