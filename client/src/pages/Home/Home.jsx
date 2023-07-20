import './Home.scss';

const Home = () => {
  return (
    <section className='home'>
      <article className='heros'>
        <h2 className='heros__title--first'>Force Majeure</h2>
      </article>
      <article className='heros'>
        <div className='heros__filter-container--first'>
          <div className='heros__filter--first'>
            <h2 className='heros__title--secondary'>To</h2>
            <h2 className='heros__title--secondary'>Create</h2>
            <h2 className='heros__title--secondary'>Your Own</h2>
            <h2 className='heros__title--secondary'>Elegant</h2>
          </div>
        </div>
      </article>
      <article className='heros'>
        <div className='heros__filter-container--secondary'>
          <div className='heros__filter--secondary'>
            <h2 className='heros__title--third'>
              Let's
              <br />
              Shop!
            </h2>
          </div>
        </div>
      </article>
    </section>
  );
};
export default Home;
