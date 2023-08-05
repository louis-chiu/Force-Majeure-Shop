import './MemberData.scss';

import { defaultAvatarUrl } from '../../data';
import { useSelector } from 'react-redux';
const MemberData = () => {
  const {
    memberData: { address, email, firstname, lastname, userid, image },
    orderHistory: { totalPrice },
  } = useSelector((store) => store.auth);
  return (
    <div className='member-data'>
      <h2 className='member-data__title'>Member Data</h2>
      <div className='member-data__content'>
        <div className='member-data__user-container'>
          <div className='member-data__image-container'>
            <img
              src={image || defaultAvatarUrl}
              alt='avatar'
              className='member-data__image'
            />
          </div>
          <p className='member-data__name'>{firstname + ' ' + lastname}</p>
        </div>
        <div className='member-data__detail'>
          <div className='member-data__email-container'>
            <p className='member-data__email-label'>Email</p>
            <p className='member-data__email'>{email}</p>
          </div>
          <div className='member-data__address-container'>
            <p className='member-data__address-label'>Address</p>
            <p className='member-data__address'>{address}</p>
          </div>
          <div className='member-data__total-spending-container'>
            <p className='member-data__total-spending-label'>Total Spending</p>
            <p className='member-data__total-spending'>$ {totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberData;
