import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Box from '@mui/material/Box';
import TodoList from './TodoList';

function Todo() {
	const [searchResult, setSearchResult] = useState([{ hidden: true }]);
	const onSearch = (data) => {
		setSearchResult(data);
	};
	return (
		<Box
			sx={{
				display: 'flex',
				p: 1,
				m: 1,
				bgcolor: 'background.paper',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
			}}
		>
			<SearchBar onSearch={onSearch} />
			{!searchResult.hidden && (
				<SearchResults searchResult={searchResult} />
			)}
			<TodoList />
		</Box>
	);
}

export default Todo;
