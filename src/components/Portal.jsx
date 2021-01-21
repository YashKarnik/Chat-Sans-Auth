import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { db } from '../firebase';
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
		<div className='portal'>
			<div className=''>
				<button className='portal-close-btn' onClick={() => setOpen(false)}>
					&times;
				</button>
				<h3>Enter room name</h3>
				<input
					type='text'
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<button onClick={handleClick}>Submit</button>
			</div>
		</div>,
		document.getElementById('portal')
	);
}
