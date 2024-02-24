import styles from './trip.module.css';
import { arrBack, locationPoint } from '../../assets';
import ModalForm from '../../components/modal form/ModalForm';
import ModalStatus from '../../components/modal status/ModalStatus';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTourbyId } from '../../api/api';

const Trip = () => {
  const { id } = useParams();
  const [tour, setTour] = useState({});
  useEffect(() => {
    async function fetchData() {
      const tour = await getTourbyId(id);
      setTour(tour);
    }
    fetchData();
  }, []);
  console.log(tour);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  return (
    <div className={styles.page}>
      {tour.id && (
        <div>
          <div className={styles.header}>
            <img src={tour.image} alt="" className={styles.headerImg} />
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
              <img
                src={arrBack}
                alt="Go back"
                className={styles.headerBtnImg}
              />
              Go back
            </button>
          </div>
          <div className={styles.body}>
            <div className={styles.bodyTitle}>{tour.title}</div>
            <div className={styles.location}>
              <img src={locationPoint} alt="" />
              {tour.location}
            </div>
            <div className={styles.bodyDescription}>
              <div className={styles.bodyDescriptionLabel}>Description</div>
              {tour.description}
            </div>
            <div className={styles.reviews}>
              <div className={styles.reviewsTitle}>Reviews</div>
              {tour.reviews.map((review, i) => (
                <div key={i} className={styles.review}>
                  <div className={styles.reviewHead}>
                    <img
                      src={review.image}
                      alt=""
                      className={styles.reviewImg}
                    />
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
        </div>
      )}
      {modal === 'book' && <ModalForm setModal={setModal}></ModalForm>}
      {!!modal && modal !== 'book' && (
        <ModalStatus message={modal} setModal={setModal}></ModalStatus>
      )}
    </div>
  );
};

export default Trip;
