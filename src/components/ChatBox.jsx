import React, { useState, useEffect } from 'react';
import { useRoomContext } from '../contexts/roomsContext';
import { db } from '../firebase';
import CircularProgress from './CircularProgress';

export default function ChatBox() {
	const { messages, name, currentRoom, setMessages } = useRoomContext();
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(true);
	//Fetch the messages of the particular room as set the <messages> array
	useEffect(() => {
		try {
			const MessagesRef = db.collection(`Rooms/${currentRoom}/Messages`);
			MessagesRef.onSnapshot(
				snapshot => {
					let x = snapshot.docs.map(e => e.data());

					setMessages(
						x.sort((a, b) => {
							if (a.time < b.time) return -1;
							else if (a.time > b.time) return 1;
							return 0;
						})
					);

					setLoading(false);
				},
				err => console.log(err)
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
		Ref.add({ data: text, name, time: Date.now() }).then(e => setText(''));
	}
	if (loading) return <CircularProgress />;
	else
		return (
			<div className='chat-window'>
				<ul className='chats flex-col'>
					{messages.map((e, i) => (
						<li
							key={i}
							className={`text-blob text-blob-${
								e.name === name ? 'sender' : 'receiver'
							}`}>
							<b>{e.name}</b>
							<hr />

							{e.data}
						</li>
					))}
				</ul>
				<div className='input-message'>
					<form method='post' autoComplete='off' onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='Type Message here'
							value={text}
							onChange={e => setText(e.target.value)}
						/>
						<button type='submit'>S</button>
					</form>
				</div>
			</div>
		);
}
