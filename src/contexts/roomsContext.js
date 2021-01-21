import React, { useContext, createContext, useState, useEffect } from 'react';
import superhero from 'superhero-name-library';
const roomsContext = createContext();
export const useRoomContext = () => useContext(roomsContext);
export const RoomsContextsProvider = props => {
	const [currentRoom, setCurrentRoom] = useState('');
	const [messages, setMessages] = useState([{ data: '' }]);
	const [name, setName] = useState(null);
	useEffect(() => {
		const heroname = superhero.random();
		const localSt = localStorage.getItem('name');
		if (localSt === null || localSt === '') {
			setName(heroname);
			localStorage.setItem('name', heroname);
		} else setName(localSt);
	}, []);
	return (
		<roomsContext.Provider
			value={{ name, currentRoom, setCurrentRoom, messages, setMessages }}>
			{props.children}
		</roomsContext.Provider>
	);
};
