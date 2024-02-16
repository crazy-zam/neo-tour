import { useEffect, useState, Children, cloneElement } from 'react';
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
              <div className={styles.item} key={item.id}>
                <img src={item.image} alt="" />
                <div className={styles.itemTxt}>{item.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
