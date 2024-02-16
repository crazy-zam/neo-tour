import styles from './trip.module.css';
import { detailed, reviews } from './../../helpers/rest';
import arrBack from './../../assets/arrow back.svg';
import locationPoint from './../../assets/location point.svg';
import ModalForm from '../UI/ModalForm';
import ModalStatus from '../UI/ModalStatus';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Trip = () => {
  const id = window.location.pathname.split('/').pop();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  console.log(!!modal && modal !== 'book');
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img src={detailed[id].image} alt="" className={styles.headerImg} />
        <button
          className={styles.headerBtn}
          onClick={() => {
            navigate('/');
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          <img src={arrBack} alt="Go back" />
          Go back
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTitle}>{detailed[id].title}</div>
        <div className={styles.location}>
          <img src={locationPoint} alt="" />
          {detailed[id].location}
        </div>
        <div className={styles.bodyDescription}>
          <div className={styles.bodyDescriptionLabel}>Description</div>
          {detailed[id].description}
        </div>
        <div className={styles.reviews}>
          <div className={styles.reviewsTitle}>Reviews</div>
          {reviews.map((review, i) => (
            <div key={i} className={styles.review}>
              <div className={styles.reviewHead}>
                <img src={review.image} alt="" className={styles.reviewImg} />
                <div className={styles.reviewPerson}>{review.person}</div>
              </div>
              <div className={styles.reviewTxt}>{review.text}</div>
            </div>
          ))}
        </div>
        <button className={styles.bookBtn} onClick={() => setModal('book')}>
          Book now
        </button>
      </div>
      {modal == 'book' && <ModalForm setModal={setModal}></ModalForm>}
      {!!modal && modal !== 'book' && (
        <ModalStatus message={modal} setModal={setModal}></ModalStatus>
      )}
    </div>
  );
};

export default Trip;
