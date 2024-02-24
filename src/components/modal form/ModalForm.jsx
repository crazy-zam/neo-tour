import { useState } from 'react';
import styles from './modalForm.module.css';
import CustomInput from '../custom input/CustomInput';
import {
  closeBtn,
  personIcon,
  flagRU,
  flagKZ,
  flagKG,
  arrowDown,
} from './../../assets/index';

const ModalForm = ({ setModal }) => {
  const [peopleCount, setPeopleCount] = useState(1);
  const [commentaries, setCommentaries] = useState('');
  const [phone, setPhone] = useState([]);
  const masks = {
    RU: { prefix: '7', mask: '999 999 9999', flag: flagRU },
    KZ: { prefix: '7', mask: '999 999 9999', flag: flagKZ },
    KG: { prefix: '996', mask: '999 999 999', flag: flagKG },
  };
  const [selectFlag, setSelectFlag] = useState({
    select: false,
    selected: 'KZ',
  });
  const phoneParser = () => {
    let res = '';
    res = res.concat(masks[selectFlag.selected].prefix);
    phone.forEach((digit) => {
      res = res.concat(digit.value);
    });
    return res;
  };
  return (
    <div
      className={styles.background}
      onClick={(event) => {
        if (event.target.className.includes('background')) setModal(false);
      }}
    >
      <div className={styles.form}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>Info</div>
          <button
            className={styles.headerCloseBtn}
            onClick={() => setModal(false)}
          >
            <img src={closeBtn} alt="" />
          </button>
        </div>
        <div className={styles.description}>
          To submit an application for a tour reservation, you need to fill in
          your information and select the number of people for the reservation
        </div>
        <div className={styles.helper}>Phone number</div>
        <div className={styles.phoneInput}>
          <div className={styles.select}>
            {selectFlag.select ? (
              <div className={styles.optionWrap}>
                {Object.keys(masks).map((item) => {
                  return (
                    <div
                      key={item}
                      className={styles.option}
                      onClick={() =>
                        setSelectFlag({ select: false, selected: item })
                      }
                    >
                      <img
                        src={masks[item].flag}
                        alt=""
                        className={styles.optionFlag}
                      />
                      <img src={arrowDown} alt="" />
                      <div className={styles.optionText}>
                        {`+ ${masks[item].prefix}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.optionWrap}>
                <div
                  className={styles.option}
                  onClick={() =>
                    setSelectFlag({
                      select: true,
                      selected: selectFlag.selected,
                    })
                  }
                >
                  <img
                    src={masks[selectFlag.selected].flag}
                    alt=""
                    className={styles.optionFlag}
                  />
                  <img src={arrowDown} alt="" />
                  <div className={styles.optionText}>{`+ ${
                    masks[selectFlag.selected].prefix
                  }`}</div>
                </div>
              </div>
            )}
          </div>
          <CustomInput
            mask={masks[selectFlag.selected].mask}
            placeholder={'_'}
            phone={phone}
            setPhone={setPhone}
          ></CustomInput>
        </div>

        <div className={styles.helper}>Commentaries to trip</div>
        <input
          className={styles.commentaries}
          autocomplete="off"
          type="text"
          name="commentaries"
          placeholder="Write your wishes to trip..."
          value={commentaries}
          onChange={(event) => setCommentaries(event.target.value)}
        />
        <div className={styles.helper}>Number of people for a reservation</div>
        <div className={styles.peopleCount}>
          <div className={styles.peopleCountBtnGroup}>
            <button
              className={styles.peopleCountBtn}
              onClick={() =>
                peopleCount > 1 && setPeopleCount((current) => current - 1)
              }
            >
              -
            </button>
            <div>{peopleCount}</div>
            <button
              className={styles.peopleCountBtn}
              onClick={() =>
                peopleCount < 6 && setPeopleCount((current) => current + 1)
              }
            >
              +
            </button>
          </div>
          <img className={styles.peopleCountImg} src={personIcon} alt="" />
          <div>{`${peopleCount} People`}</div>
        </div>
        <button
          className={styles.submitBtn}
          disabled={
            !commentaries ||
            !phone.reduce(
              (acc, val) => (val.type == 'input' ? acc && !!val.value : acc),
              true,
            )
          }
          onClick={() => {
            setModal(
              `Your Trip has been booked! We will call you by phone: ${phoneParser()}`,
            );
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ModalForm;
