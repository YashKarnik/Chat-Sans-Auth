import React from 'react';
import Rooms from './Rooms';
import ChatBox from './ChatBox';
import { RoomsContextsProvider } from '../contexts/roomsContext';
export default function App() {
	return (
		<RoomsContextsProvider>
			<div className='container '>
				<Rooms />
				<ChatBox />
			</div>
		</RoomsContextsProvider>
	);
}
