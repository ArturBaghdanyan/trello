import { useState } from 'react';

import { HideElement } from './hide-element';
import description from '../../assets/card-modal_icons/menu_description.svg';
import styles from '../card-activity/styles.module.scss';

export const CardActivity = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.activity}>
      <div className={styles.title}>
        <div className={styles.text}>
          <img src={description} alt="description" />
          <h2>Activity</h2>
        </div>
        <button>Show details</button>
      </div>
      {show ? (
        <HideElement />
      ) : (
        <div className={styles.footer}>
          <span>A</span>
          <button onClick={() => setShow(true)}>Write a comment...</button>
        </div>
      )}
    </div>
  );
};
