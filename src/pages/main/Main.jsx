import { logo, arrow, arrowLeft, arrowRigth, dot } from './../../assets/index';
import styles from './main.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { getRecommendTours, getDiscoverTours } from '../../api/api';
const Main = () => {
  const swiperRef = useRef();
  const tabs = ['Popular', 'Featured', 'Most Visited', 'Europe', 'Asia'];
  const [activeTab, setActiveTab] = useState('Popular');
  const [activeTabTours, setActiveTabTours] = useState([]);
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    async function fetch() {
      const tours = await getDiscoverTours(tabs.indexOf(activeTab) + 1);
      const recommendedTours = await getRecommendTours();
      setActiveTabTours(tours);
      setRecommended(recommendedTours);
    }
    fetch();
  }, []);
  useEffect(() => {
    async function fetch() {
      const tours = await getDiscoverTours(tabs.indexOf(activeTab) + 1);
      setActiveTabTours(tours);
      swiperRef.current.slideTo(0, 1000);
    }
    fetch();
  }, [activeTab]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerSide}>
          <div className={styles.headerSideTitle}>Winter Vacation Trips</div>
          <div className={styles.headerSideDescription}>
            Enjoy your winter vacations with warmth and amazing sightseeing on
            the mountains. Enjoy the best experience with us!
          </div>
          <button
            className={styles.headerBtn}
            onClick={() =>
              window.scrollTo({
                top: 700,
                left: 0,
                behavior: 'smooth',
              })
            }
          >
            <div>Let’s Go!</div>
            <img src={arrow} alt="" />
          </button>
        </div>
        <img src={logo} alt="traveler" className={styles.headerLogo} />
      </div>
      <div className={styles.discover}>
        <div className={styles.discoverHead}>
          <div className={styles.discoverHeadTxt}>Discover</div>
          <div className={styles.discoverArrows}>
            <button
              className={styles.discoverArrow}
              onClick={() => swiperRef.current.slidePrev()}
            >
              <img
                src={arrowLeft}
                alt="swipe forward"
                className={styles.discoverArrowImg}
              />
            </button>
            <button
              className={styles.discoverArrow}
              onClick={() => swiperRef.current.slideNext()}
            >
              <img
                src={arrowRigth}
                alt="swipe backward"
                className={styles.discoverArrowImg}
              />
            </button>
          </div>
        </div>
        <div className={styles.discoverNavigate}>
          {tabs.map((tab) => {
            return (
              <div key={tab}>
                <button
                  className={
                    tab === activeTab
                      ? styles.discoverNavigateActiveBtn
                      : styles.discoverNavigateBtn
                  }
                  onClick={(event) => {
                    if (event.target.className.includes('Active')) return;

                    setActiveTab(tab);
                  }}
                >
                  {tab}
                </button>
                {tab === activeTab && <img src={dot} alt="" />}
              </div>
            );
          })}
        </div>
        <div className={styles.swiperContainer}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="mySwiper"
            slidesPerView={1}
            spaceBetween={10}
            breakpointsBase={'container'}
            breakpoints={{
              800: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {activeTabTours.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={styles.discoverItemWrap}>
                  <Link
                    className={styles.discoverItem}
                    to={`/trips/${item.id}`}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                      });
                    }}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className={styles.discoverItemImg}
                    />
                    <div className={styles.discoverItemTxt}>
                      {item.location}
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={styles.recommended}>
        <div className={styles.recommendedHead}>Recommended</div>
        <div className={styles.recommendedGrid}>
          {recommended.map((item) => {
            return (
              <Link
                to={`/trips/${item.id}`}
                className={styles.recommendedItem}
                key={item.id}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  className={styles.recommendedImg}
                />
                <div className={styles.recommendedTxt}>{item.location}</div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* <Link to={'/admin'}>admin panel</Link> */}
    </div>
  );
};

export default Main;
