import './OrderItem.scss';
const OrderItem = ({
  allItemRef,
  index,
  name,
  image,
  color,
  size,
  quantity: amount,
  price,
}) => {
  const defaultStyle = {
    transform: `translateY(calc(${index * -10.75}rem - 100px - 0.75rem))`,
  };
  return (
    <div
      className='order-item'
      ref={(ref) => (allItemRef[index] = ref)}
      style={defaultStyle}
    >
      <div className='order-item__image-container'>
        <img
          src={image}
          alt={name}
          className='order-item__image'
        />
      </div>
      <div className='order-item__detail'>
        <p className='order-item__name'>{name}</p>
        <div className='order-item__detail-container'>
          <div className='order-item__color-container'>
            <div
              className='order-item__color'
              style={{ background: color }}
            />
          </div>
          <p className='order-item__size'>{size}</p>
          <p className='order-item__amount'>{amount}</p>
          <p className='order-item__price'>{`$ ${
            parseInt(amount) * parseInt(price)
          }`}</p>
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
