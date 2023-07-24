import { useActionData } from 'react-router-dom';
import './Member.scss';
import { useSelector } from 'react-redux';
import { store } from '../../store';
const Member = () => {
  const {
    memberData: {
      address,
      email,
      lastname: lastName,
      firstname: firstName,
      userid: userId,
    },
  } = useSelector((store) => store.user);
  return (
    <table className='member-data'>
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>ID</th>
        <th>Address</th>
      </thead>
      <tbody>
        <td>{lastName + ' ' + firstName}</td>
        <td>{email}</td>
        <td>{userId}</td>
        <td>{address}</td>
      </tbody>
    </table>
  );
};
export default Member;
