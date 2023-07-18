const Comment = ({ image, name, rating, content, order }) => {
  return (
    <div className='comment'>
      <img
        src={image}
        alt={`${name}-avatar`}
        className='comment__avatar'
      />
      <div className='comment-body'>
        <p className='comment__username'>{name}</p>
        <p className='comment__content'>{content}</p>
      </div>
      <div className='comment__product-rating'></div>
      <div className='order-detail'>
        <p className='order-detail__amount'>{order?.amount || 'amount'}</p>
        <span className='order-detail__color'>{order?.color || 'color'}</span>
        <span className='order-detail__size'>{order?.size || 'size'}</span>
      </div>
      <div className='comment__edit'>edit</div>

    </div>
  );
};
export default Comment;
