import { Form } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import './ProductForm.scss';
import ColorSelector from '../ColorSelector/ColorSelector';
import SizeSelector from '../SizeSelector/SizeSelector';
import AmountSelector from '../AmountSelector/AmountSelector';
import Slider from '../Slider/Slider';
const ProductForm = ({
  image,
  name,
  rating,
  price,
  description,
  color,
  size,
  stock,
}) => {
  return (
    <Form className='product-form'>
      <section className='product-form__image-container'>
        <img
          className='product-form__image'
          src={image?.[0]}
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
          <div className='product-detail__rating'>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
          </div>
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
              stock={stock}
            ></AmountSelector>
            <p className='product-detail__total-price'>$ {price}</p>
          </div>
          <p className='product-detail__stock'>
            {stock < 40 && `only ${stock} lefts in stocks!`}
          </p>
          <div className='product-detail__button-group'>
            <div className='product-detail__buy'>Buy Now</div>
            <div className='product-detail__cart'>Add to Cart</div>
          </div>
        </div>
      </section>
    </Form>
  );
};
export default ProductForm;
