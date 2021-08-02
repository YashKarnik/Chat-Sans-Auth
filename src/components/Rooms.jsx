import React, { useState, useEffect } from 'react';
import { useRoomContext } from '../contexts/roomsContext';
import { db } from '../firebase';
import CircularProgress from './CircularProgress';
import Portal from './Portal';
import styles from '../styles/css/rooms.module.css';

export default function Rooms() {
  const {
    name,
    currentRoom,
    setCurrentRoom,
    setMessages,
    portalOpen,
    setPortalOpen,
  } = useRoomContext();
  const [roomsArray, setRoomsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get all room Names and set <roomsArray>
  useEffect(() => {
    const roomsRef = db.collection('Rooms');
    roomsRef.onSnapshot((snapshot) => {
      setLoading(false);
      if (snapshot.empty) return;
      // snapshot.forEach(doc => {
      // 	setRoomsArray(p => [...p, doc.id]);
      // });
      setRoomsArray(snapshot.docs.map((e) => e.id));
      setRoomsArray((p) =>
        p.sort((a, b) => {
          if (a.time > b.time) return 1;
          else if (a.time < b.time) return -1;
          return 0;
        })
      );
    });
    return () => setRoomsArray([]);
  }, []);

  //Setting initial active room as soon as <roomsArray>  sees a change
  useEffect(() => {
    setCurrentRoom(roomsArray[0]);
    return () => setMessages([]);
  }, [roomsArray, setCurrentRoom, setMessages]);
  // if (roomsArray.length !== 0) return <h1>Please create a room</h1>;
  if (loading) return <CircularProgress />;
  else
    return (
      <div className={styles.rooms_wrapper}>
        <h1 className={styles.name}>{name}</h1>
        <ul className={styles.rooms_list}>
          {roomsArray.map((e, i) => (
            <li
              key={i}
              onClick={(evt) => setCurrentRoom(evt.target.innerText)}
              data-current-room={currentRoom === e}
              className={styles.room}
            >
              {e}
            </li>
          ))}

          <button
            className={styles.create_room_btn}
            onClick={() => setPortalOpen(true)}
          >
            +
          </button>
        </ul>
        <Portal open={portalOpen} setOpen={setPortalOpen} />
      </div>
    );
}
