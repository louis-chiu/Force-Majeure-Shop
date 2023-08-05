import './BannerItem.scss';
const BannerItem = ({ url, translate }) => {
  return (
    <li
      className='slide'
      style={{
        background: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translate(${translate}vw)`,
      }}
    >
      <div className='slide__filter'>
        <h2 className='slide__title'>Force Majeure</h2>
      </div>
    </li>
  );
};
export default BannerItem;
