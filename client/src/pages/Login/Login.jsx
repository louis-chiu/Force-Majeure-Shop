import './Login.scss';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import InputBar from '../../components/InputBar/InputBar';
const Login = () => {
  return (
    <div className='login'>
      <form
        action=''
        className='login-form'
      >
        <h3 className='login-form__title'>Login</h3>
        <InputBar
          type='email'
          name='account'
        >
          <BsFillPersonFill />
        </InputBar>
        <InputBar
          type='password'
          name='password'
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
      </form>
      <div className='quick-login'></div>
    </div>
  );
};
export default Login;
