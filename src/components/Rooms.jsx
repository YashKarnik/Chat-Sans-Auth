import React, { useState, useEffect } from 'react';
import { useRoomContext } from '../contexts/roomsContext';
import { db } from '../firebase';
import CircularProgress from './CircularProgress';
import Portal from './Portal';
export default function Rooms() {
	const { name, currentRoom, setCurrentRoom, setMessages } = useRoomContext();
	const [roomsArray, setRoomsArray] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	//Get all room Names and set <roomsArray>
	useEffect(() => {
		const roomsRef = db.collection('Rooms');
		roomsRef.onSnapshot(snapshot => {
			setLoading(false);
			if (snapshot.empty) return;
			// snapshot.forEach(doc => {
			// 	setRoomsArray(p => [...p, doc.id]);
			// });
			setRoomsArray(snapshot.docs.map(e => e.id));
			setRoomsArray(p =>
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

	if (loading) return <CircularProgress />;
	else
		return (
			<div className='rooms'>
				<ul className='flex-col'>
					<li>{name}</li>
					{roomsArray.map((e, i) => (
						<li
							key={i}
							onClick={evt => setCurrentRoom(evt.target.innerText)}
							style={{
								background: currentRoom === e ? 'white' : 'red',
							}}>
							{e}
						</li>
					))}
					<button onClick={() => setOpen(true)}>+</button>
					<Portal open={open} setOpen={setOpen} />
				</ul>
			</div>
		);
}
