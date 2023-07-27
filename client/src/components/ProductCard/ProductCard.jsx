import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import './ProductCard.scss';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
const ProductCard = ({ id, name, image, price, rating }) => {
  return (
    <Link
      to={`/product/${id}`}
      className='product-card'
    >
      <div className='product-card__image-container'>
        <img
          src={image?.[0]}
          alt={name}
          className='product-card__image'
        />
      </div>
      <p className='product-card__name'>{name}</p>
      <div className='product-card__detail'>
        <p className='product-card__price'>$ {price}</p>
        <Rating rating={rating} />
      </div>
    </Link>
  );
};
export default ProductCard;
