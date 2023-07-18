import { Form } from 'react-router-dom';

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
          src={image}
          alt={name}
        />
        <div className='product-form__image-slider'></div>
      </section>
      <section className='product-detail'>
        <div className='product-detail__header'>
          <h3 className='product-detail__name'>{name}</h3>
          <div className='product-detail__rating'></div>
        </div>
        <div className='product-detail__body'>
          <p className='product-detail__price'>${price}</p>
          <p className='product-detail__description'>{description}</p>
          <div className='product-detail__color-group'></div>
          <div className='product-detail__size-group'></div>
          <div className='product-detail__selector-container'>
            <div className='product-detail__amount-selector'></div>
            <p className='product-detail__total-price'>{price}</p>
          </div>
          <p className='product-detail__stock'></p>
          <div className='product-detail__button-group'>
            <div className='product-detail__buy'></div>
            <div className='product-detail__cart'></div>
          </div>
        </div>
      </section>
    </Form>
  );
};
export default ProductForm;
