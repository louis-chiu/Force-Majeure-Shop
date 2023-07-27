import './Rating.scss';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Rating = ({ rating }) => {
  const starArray = [0, 0, 0, 0, 0];
  const hasHalfStar = rating % 1 !== 0;
  const numOfFillStar = Math.floor(rating);
  const numOfEmptyStar = Math.floor(5 - rating);
  return (
    <div className='rating'>
      {starArray.map((type, index) => {
        if (index < numOfFillStar) {
          return <BsStarFill key={index} />;
        } else if (hasHalfStar && index == numOfFillStar) {
          return <BsStarHalf key={index} />;
        } else {
          return <BsStar key={index} />;
        }
      })}
    </div>
  );
};
export default Rating;
