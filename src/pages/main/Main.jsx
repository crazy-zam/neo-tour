import { logo, arrow, arrowLeft, arrowRigth, dot } from './../../assets/index';
import styles from './main.module.css';
import Carousel from '../../components/carousel/Carousel';
import {
  recommended,
  discoverPopular,
  discoverFuture,
} from '../../helpers/rest';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Main = () => {
  const swiperRef = useRef();
  const tabs = ['Popular', 'Featured', 'Most Visited', 'Europe', 'Asia'];
  const [activeTab, setActiveTab] = useState('Popular');
  const [offset, setOffset] = useState(0);
  const PAGE_WIDTH = 424;
  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => Math.min(currentOffset + PAGE_WIDTH, 0));
  };
  const handleRightArrowClick = () => {
    setOffset((currentOffset) =>
      Math.max(
        currentOffset - PAGE_WIDTH,
        -(PAGE_WIDTH * (discoverPopular.length - 3)),
      ),
    );
  };

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
            {/* <button
              className={styles.discoverArrow}
              onClick={handleLeftArrowClick}
            >
              <img src={arrowLeft} alt="" />
            </button>
            <button
              className={styles.discoverArrow}
              onClick={handleRightArrowClick}
            >
              <img src={arrowRigth} alt="" />
            </button> */}
          </div>
        </div>
        <div className={styles.discoverNavigate}>
          {tabs.map((tab) => {
            return (
              <div key={tab}>
                <button
                  className={
                    tab == activeTab
                      ? styles.discoverNavigateActiveBtn
                      : styles.discoverNavigateBtn
                  }
                  onClick={(event) => {
                    if (event.target.className.includes('Active')) return;

                    setActiveTab(tab);
                    setOffset(0);
                  }}
                >
                  {tab}
                </button>
                {tab == activeTab && <img src={dot} alt="" />}
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
            {discoverPopular.map((item) => (
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

        {/* <Carousel
          className={styles.discoverCarousel}
          pageWidth={PAGE_WIDTH}
          offset={offset}
          discover={activeTab == 'Popular' ? discoverPopular : discoverFuture}
        ></Carousel> */}
      </div>
      <div className={styles.recommended}>
        <div className={styles.recommendedHead}>Recommended</div>
        <div className={styles.recommendedGrid}>
          {recommended.map((item) => {
            return (
              <Link
                to={`/trips/${item.id}`}
                className={styles.recommendedImg}
                key={item.id}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <img src={item.image} alt="" />
                <div className={styles.recommendedTxt}>{item.location}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;