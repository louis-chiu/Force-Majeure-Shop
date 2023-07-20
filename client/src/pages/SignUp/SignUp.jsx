import './SignUp.scss';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import InputBar from '../../components/InputBar/InputBar';
const SignUp = () => {
  return (
    <div className='sign-up'>
      <form
        action=''
        className='sign-up-form'
      >
        <h3 className='sign-up-form__title'>Sign Up</h3>
        <InputBar
          type='email'
          name='account'
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
      </form>
      <div className='quick-sign-up'></div>
    </div>
  );
};
export default SignUp;
