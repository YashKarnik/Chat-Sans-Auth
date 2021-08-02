import React, { useContext, createContext, useState } from 'react';
import superhero from 'superhero-name-library';
const roomsContext = createContext();
export const useRoomContext = () => useContext(roomsContext);
export const RoomsContextsProvider = (props) => {
  const [currentRoom, setCurrentRoom] = useState('');
  const [messages, setMessages] = useState([{ data: '' }]);
  const [name] = useState(superhero.random());
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <roomsContext.Provider
      value={{
        name,
        currentRoom,
        setCurrentRoom,
        messages,
        setMessages,
        portalOpen,
        setPortalOpen,
      }}
    >
      {props.children}
    </roomsContext.Provider>
  );
};
