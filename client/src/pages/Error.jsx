import { FaRegSadTear } from 'react-icons/fa';
import './Error.scss';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <div className='error'>
      <div className='error__icon'>
        <FaRegSadTear />
      </div>
      <h2 className='error__title'>Error!</h2>
      <p className='error__content'>Something went wrong..</p>
      <Link
        className='error__btn'
        to={'/'}
      >
        Back to Home
      </Link>
    </div>
  );
};
export default Error;
