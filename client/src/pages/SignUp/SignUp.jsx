import './SignUp.scss';
import { Form, Link, redirect } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import InputBar from '../../components/InputBar/InputBar';
import { store } from '../../store';
import {
  login,
  extendedApiSlice as authApi,
} from '../../features/auth/authSlice';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const promise = store.dispatch(authApi.endpoints.register.initiate(user));
  try {
    const response = await promise.unwrap();
    store.dispatch(login({ email: user.email, password: user.password }));
    return redirect('/member');
  } catch (error) {
    return redirect('/signup');
  } finally {
    promise.unsubscribe();
  }
};

const SignUp = () => {
  return (
    <div className='sign-up'>
      <Form
        method='POST'
        className='sign-up-form'
      >
        <h3 className='sign-up-form__title'>Sign Up</h3>
        <InputBar
          type='email'
          name='email'
        >
          Email
        </InputBar>
        <InputBar
          type='password'
          name='password'
        >
          Password
        </InputBar>
        <InputBar
          type='password'
          name='confirmPassword'
        >
          Confirm
        </InputBar>
        <InputBar
          type='text'
          name='firstName'
        >
          First Name
        </InputBar>
        <InputBar
          type='text'
          name='lastName'
        >
          Last Name
        </InputBar>
        <InputBar
          type='text'
          name='address'
        >
          Address
        </InputBar>
        <div className='sign-up-form__button-group'>
          <Link
            to='/login'
            className='sign-up-form__login'
          >
            Back to Login
          </Link>
          <button
            type='submit'
            className='sign-up-form__sign-up'
          >
            Sign Up
          </button>
        </div>
      </Form>
      <div className='quick-sign-up'></div>
    </div>
  );
};
export default SignUp;
