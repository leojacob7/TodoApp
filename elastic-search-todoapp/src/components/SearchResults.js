import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function SearchResults({ searchResult }) {
	if (searchResult[0]?.hidden) {
		return null;
	}
	if (
		!searchResult ||
		searchResult.length === 0 ||
		searchResult.hits?.hits?.length === 0
	) {
		return <div className="searchResults">No results</div>;
	}

	return (
		<TableContainer
			component={Paper}
			sx={{
				maxWidth: 200,
				display: 'flex',
				p: 1,
				m: 1,
				bgcolor: 'background.paper',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Table
				sx={{
					maxWidth: 200,
					display: 'flex',
					p: 1,
					m: 1,
					bgcolor: 'background.paper',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Todo</TableCell>
						<TableCell align="right">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{searchResult?.hits?.hits?.map((row) => {
						return (
							<TableRow
								key={row._id}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{row._source.todo}
								</TableCell>
								<TableCell align="right">
									{row._source.status}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default SearchResults;
