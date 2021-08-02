import React from 'react';
import Rooms from './Rooms';
import ChatBox from './ChatBox';
import { useRoomContext } from '../contexts/roomsContext';
import styles from '../styles/css/app.module.css';
export default function App() {
  const { portalOpen } = useRoomContext();

  return (
    <div className={`${styles.container} ${portalOpen && styles.blur_bg} `}>
      <Rooms />
      <ChatBox />
    </div>
  );
}
