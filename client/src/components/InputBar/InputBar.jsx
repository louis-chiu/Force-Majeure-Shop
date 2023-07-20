import { useLocation } from 'react-router-dom';
import './InputBar.scss';
const InputBar = ({ type, name, children }) => {
  const { pathname } = useLocation();
  const requiredList = ['email', 'password'];
  console.log(typeof children);
  const labelStyle =
    pathname === '/login'
      ? {
          fontSize: '2rem',
          width: 'fit-content',
        }
      : {};
  return (
    <div className='input-bar'>
      <label
        className='input-bar__label'
        style={labelStyle}
        htmlFor={name}
      >
        {children}
      </label>
      <input
        className='input-bar__input'
        type={type}
        name={typeof children === 'string' ? children : type}
        required={requiredList.includes(type)}
      />
    </div>
  );
};
export default InputBar;
