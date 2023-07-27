import { defaultAvatarUrl } from '../../data';
import './Comment.scss';
import Rating from '../Rating/Rating';
const Comment = ({
  image,
  name: username,
  rating,
  content,
  orderItem: {
    size,
    color: { hex, name: colorName },
    amount,
  },
}) => {
  return (
    <div className='comment'>
      <div className='comment__avatar-container'>
        <img
          src={image || defaultAvatarUrl}
          alt={`${username}-avatar`}
          className='comment__avatar'
        />
      </div>
      <div className='comment-body'>
        <div className='comment__user-container'>
          <p className='comment__username'>{username}</p>
          <Rating
            className='comment__product-rating'
            rating={rating}
          />
        </div>
        <div className='comment__content-container'>
          <p className='comment__content'>{content}</p>
        </div>
      </div>
      <div className='order-detail'>
        <p className='order-detail__amount'>{`Buy  ${amount}` ?? 'amount'}</p>
        <div
          className='order-detail__color'
          style={{ background: hex }}
        />
        <div className='order-detail__size'>{size ?? 'size'}</div>
      </div>

      {/* <div className='comment__edit'>edit</div> */}
    </div>
  );
};
export default Comment;
