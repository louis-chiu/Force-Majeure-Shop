import { Form, useLocation, useParams } from 'react-router-dom';
import './ProductForm.scss';
import ColorSelector from '../ColorSelector/ColorSelector';
import SizeSelector from '../SizeSelector/SizeSelector';
import AmountSelector from '../AmountSelector/AmountSelector';
import Slider from '../Slider/Slider';
import Rating from '../Rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetAmount,
  resetCartItem,
  setStock,
} from '../../features/cartItem/cartItemSlice';
import { useEffect } from 'react';
import { addItem } from '../../features/cart/cartSlice';

const ProductForm = ({ product }) => {
  const { id } = useParams();
  const {
    image,
    name,
    rating,
    price,
    description,
    color,
    size,
    stock: stockList,
  } = product;

  const {
    color: colorState,
    size: sizeState,
    stock,
  } = useSelector((store) => store.cartItem);

  const { currentHoverIndex } = useSelector(
    (store) => store.singleProductSlider
  );

  const cartItem = useSelector((store) => store.cartItem);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem({ ...cartItem, isAddToCart: true }));
    dispatch(
      resetCartItem({
        ...product,
        id,
      })
    );
  };

  useEffect(() => {
    if (!colorState || !sizeState) return;
    const [_, currentStock] = Object.entries(stockList).find(
      ([colorAndSize, stock]) => {
        const [color, size] = colorAndSize.split(', ');
        return color === colorState && size === sizeState;
      }
    );
    // const [_, currentStock] = arrStock;
    dispatch(setStock({ stock: currentStock }));
    dispatch(resetAmount());
  }, [colorState, sizeState]);
  return (
    <form
      className='product-form'
      onSubmit={handleAddToCart}
    >
      <section className='product-form__image-container'>
        <img
          className='product-form__image'
          src={image?.[currentHoverIndex]}
          alt={name}
        />
        <Slider
          className='product-form__image-slider'
          imageList={image}
          name={name}
        />
      </section>
      <section className='product-detail'>
        <div className='product-detail__header'>
          <h3 className='product-detail__name'>{name}</h3>
          <Rating rating={rating} />
        </div>
        <hr className='product-detail__hr' />
        <div className='product-detail__body'>
          <p className='product-detail__price'>$ {price}</p>
          <p className='product-detail__description'>{description}</p>
          <ColorSelector
            className='product-detail__color-selector'
            colorList={color}
          />
          <SizeSelector
            className='product-detail__size-selector'
            sizeList={size}
          />
          <div className='product-detail__selector-container'>
            <AmountSelector
              className='product-detail__amount-selector'
              product={cartItem}
            ></AmountSelector>
            <p className='product-detail__total-price'>$ {price}</p>
          </div>
          <p className={stock < 10 ? `product-detail__stock` : ``}>
            {stock < 10 && `only ${stock} lefts in stocks!`}
          </p>

          <div className='product-detail__button-group'>
            <button
              type='submit'
              className='product-detail__buy'
            >
              Buy Now
            </button>
            <button
              type='submit'
              className='product-detail__cart'
              value={'cart'}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};
export default ProductForm;
