import './Login.scss';
import { Form, Link, redirect, useActionData } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import InputBar from '../../components/InputBar/InputBar';
import { useLoginMutation } from '../../features/auth/authSlice';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { store } from '../../store';
import {
  login,
  extendedApiSlice as authApi,
} from '../../features/auth/authSlice';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const promise = store.dispatch(authApi.endpoints.login.initiate(credentials));

  try {
    const credentials = await promise.unwrap();
    store.dispatch(login(credentials));
    return redirect('/member');
  } catch (error) {
    return redirect('/login');
  } finally {
    promise.unsubscribe();
  }
};
const Login = () => {
  // const { data: user, isLoading, isError } = useLoginMutation();
  // if (isLoading) return <Loading />;
  // if (isError) return <Error />;
  return (
    <div className='login'>
      <Form
        className='login-form'
        method='POST'
      >
        <h3 className='login-form__title'>Login</h3>
        <InputBar
          type='email'
          name='email'
          value='user2@example.com'
        >
          <BsFillPersonFill />
        </InputBar>
        <InputBar
          type='password'
          name='password'
          value='password2'
        >
          <RiLockPasswordFill />
        </InputBar>
        <div className='login-form__button-group'>
          <Link
            to='/signup'
            className='login-form__signup'
          >
            Create Account
          </Link>
          <button
            type='submit'
            className='login-form__login'
          >
            Login
          </button>
        </div>
      </Form>
      <div className='quick-login'></div>
    </div>
  );
};
export default Login;
