import './Loading.scss';
import { AiOutlineLoading } from 'react-icons/ai';
const Loading = () => {
  return (
    <div className='loading'>
      <div className='loading__icon'>
        <AiOutlineLoading />
      </div>
    </div>
  );
};
export default Loading;
