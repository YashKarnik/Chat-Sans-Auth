import React, { useState, useEffect } from 'react';
import { useRoomContext } from '../contexts/roomsContext';
import { db } from '../firebase';
import CircularProgress from './CircularProgress';
import styles from '../styles/css/chatWindow.module.css';
import rightArrow from '../assets/right-arrow.png';

export default function ChatBox() {
  const { messages, name, currentRoom, setMessages } = useRoomContext();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log({ messages, name, currentRoom, setMessages });
  }, [messages, name, currentRoom, setMessages]);
  useEffect(() => {
    try {
      const MessagesRef = db.collection(`Rooms/${currentRoom}/Messages`);
      MessagesRef.onSnapshot(
        (snapshot) => {
          let x = snapshot.docs.map((e) => e.data());

          setMessages(
            x.sort((a, b) => {
              if (a.time < b.time) return -1;
              else if (a.time > b.time) return 1;
              return 0;
            })
          );

          setLoading(false);
        },
        (err) => console.log(err)
      );
    } catch (error) {}
    return () => {
      setLoading(true);
      setMessages([]);
    };
  }, [currentRoom, setMessages]);
  function handleSubmit(e) {
    e.preventDefault();
    const Ref = db.collection(`Rooms/${currentRoom}/Messages`);
    Ref.add({ data: text, name, time: Date.now() }).then((e) => setText(''));
  }
  if (loading || !currentRoom) return <CircularProgress />;
  else
    return (
      <div className={styles.chatsWrapper}>
        <ul className={styles.chat_list}>
          {messages.map((e, i) => (
            <li
              key={i}
              // data-self={e.name === name}
              className={`${styles.text_blob}  ${
                e.name === name
                  ? styles.text_blob_sender
                  : styles.text_blob_receiver
              }`}
            >
              <p className={styles.name}>
                <b>{e.name}</b>
              </p>
              <p className={styles.content}>{e.data}</p>
            </li>
          ))}
        </ul>
        <form
          className={styles.addChatForm}
          method='post'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Type message here...'
            value={text}
            className={styles.input_message}
            onChange={(e) => setText(e.target.value)}
          />
          <button type='submit' className={styles.send_message}>
            <img src={rightArrow} alt='Send' />
          </button>
        </form>
      </div>
    );
}
