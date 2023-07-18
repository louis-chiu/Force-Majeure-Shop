const CartItem = ({ image, name, color, size, price, amount }) => {
  return (
    <div className='cart-item'>
      <img
        src={image}
        alt={name}
        className='cart-item__image'
      />
      <span className='cart-item__name'>{name}</span>
      <div className='cart-item__color'>{color}</div>
      <p className='cart-item__size'>{size}</p>
      <div className='cart-item__amount-selector'></div>
      <button className='cart-item__remove'>Remove</button>
    </div>
  );
};
export default CartItem;
