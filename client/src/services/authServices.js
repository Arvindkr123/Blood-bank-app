import { userLogin, userRegister } from '../redux/feature/auth/authActions';
import store from '../redux/store';

export const loginHandler = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!email || !password || !role) {
      return alert('please enter all fields');
    }
    // console.log('login', e, email, password, role);
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const registerHandler = (
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
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        orgnizationName,
        hospitalName,
        website,
        address,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
