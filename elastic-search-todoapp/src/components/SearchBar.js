import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import { searchTodos } from '../api';
import { Close } from '@material-ui/icons';
import { IconButton } from '@mui/material';

export default function SearchBar({ onSearch }) {
	const debounceOnChange = useCallback(
		_.debounce((query) => onElasticSearch(query), 800),
		[]
	);

	const onElasticSearch = async (query) => {
		if (!query || query.length === 0) {
			return onSearch([{ hidden: true }]);
		}
		const { data = [] } = await searchTodos(query);
		return onSearch(data.results);
	};

	return (
		<div
			className="stackSearchBar"
			spacing={2}
			sx={{ width: 300, display: 'flex' }}
		>
			<TextField
				id="outlined-basic"
				label="Search for a todo"
				variant="outlined"
				onChange={(e) => debounceOnChange(e.target.value)}
			/>
			<IconButton
				color="primary"
				aria-label="Edit"
				onClick={() => {
					onSearch([]);
				}}
			>
				<Close />
			</IconButton>
		</div>
	);
}
