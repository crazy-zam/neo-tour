import React, { useEffect } from 'react';

import styles from './customInput.module.css';
import { useRef } from 'react';
const CustomInput = ({ mask, placeholder, phone, setPhone }) => {
  const symbols = Array.from(mask);
  const arr = [];
  symbols.reduce((acc, sym) => {
    arr.push({
      type: sym == 9 ? 'input' : 'blank',
      value: '',
      placeholder: sym == 9 ? placeholder : sym,
      ind: sym == 9 ? acc : null,
    });
    if (sym == 9) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  useEffect(() => {
    setPhone([...arr]);
  }, [mask]);
  const inputRefs = useRef([]);
  const onKeyDown = (event) => {
    const index = +event.target.dataset.index;
    const value = event.key;
    if (value === 'Backspace') {
      if (event.target.value === '') {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          inputRefs.current[index - 1].select();
        }

        setPhone(
          phone.map((obj, i) =>
            obj.ind === index - 1 ? { ...obj, value: '' } : obj,
          ),
        );
      } else {
        setPhone(
          phone.map((obj, i) =>
            obj.ind === index ? { ...obj, value: '' } : obj,
          ),
        );
      }
    } else if (index > 0 && event.key === 'ArrowLeft') {
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].select();
    } else if (
      index < phone[phone.length - 1].ind &&
      event.key === 'ArrowRight'
    ) {
      inputRefs.current[index + 1].focus();
      inputRefs.current[index + 1].select();
    }
  };
  const onChange = (event) => {
    const index = +event.target.dataset.index;
    const value = event.target.value;
    const regex = /[0-9]|\./;
    if (regex.test(value)) {
      setPhone(
        phone.map((obj, i) =>
          obj.ind === index ? { ...obj, value: value ? value : '' } : obj,
        ),
      );
      if (index < phone[phone.length - 1].ind) {
        inputRefs.current[index + 1].focus();
        inputRefs.current[index + 1].select();
      }
    }
  };
  const onFocus = (event) => {
    const index = +event.target.dataset.index;
    inputRefs.current[index].select();
  };

  return (
    <div className={styles.wrapper}>
      {phone.map((obj, i) =>
        obj.type == 'input' ? (
          <input
            key={i}
            autoComplete="off"
            name="sumbol"
            className={styles.oneSymbol}
            value={obj.value}
            placeholder={obj.placeholder}
            data-index={obj.ind}
            onChange={onChange}
            ref={(input) => (inputRefs.current[obj.ind] = input)}
            maxLength="1"
            onKeyUp={onKeyDown}
            onFocus={onFocus}
          />
        ) : (
          <pre key={i} className={styles.oneSymbolMask}>
            {symbols[i]}
          </pre>
        ),
      )}
    </div>
  );
};

export default CustomInput;
