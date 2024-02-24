import styles from './modalStatus.module.css';

const ModalStatus = ({ message, setModal }) => {
  console.log(message);
  return (
    <div
      className={styles.background}
      onClick={(event) => {
        if (event.target.className.includes('background')) setModal(false);
      }}
    >
      <div className={styles.form}>
        <div className={styles.message}>{message}</div>
        <button
          className={styles.submitBtn}
          onClick={() => {
            setModal(false);
          }}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default ModalStatus;
