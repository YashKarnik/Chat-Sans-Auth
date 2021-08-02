import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { db } from '../firebase';
import styles from '../styles/css/portal.module.css';

export default function Modal({ open, setOpen }) {
  function handleClick(e) {
    e.preventDefault();
    const RoomsRef = db.collection('Rooms').doc(text);
    RoomsRef.set({}).then(() => {
      setText('');
      setOpen(false);
    });
  }
  const [text, setText] = useState('');
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className={styles.portal}>
      <div className=''>
        <button
          className={styles.portal_close_btn}
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <h3 className={styles.portal_title}>Enter room name</h3>
        <input
          type='text'
          value={text}
          placeholder='Enter room name...'
          className={styles.room_input}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={styles.room_input_submit_btn} onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>,
    document.getElementById('portal')
  );
}
