import { Link } from 'react-router-dom';

import styles from './carousel.module.css';
const Carousel = ({ offset, discover }) => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.window}>
          <div
            className={styles.allPagesContainer}
            style={{
              transform: `translateX(${offset}px)`,
            }}
          >
            {discover.map((item) => (
              <Link
                to={`/trips/${item.id}`}
                className={styles.item}
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
                <div className={styles.itemTxt}>{item.location}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
