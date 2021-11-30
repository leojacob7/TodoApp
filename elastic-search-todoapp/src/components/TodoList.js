import { Grid, IconButton, Input, Paper } from '@mui/material';
import { Check, Restore as UndoRounded } from '@material-ui/icons';
import React, { useEffect, useState, useRef } from 'react';
import { createTodos, getTodos, updateTodos } from '../api';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';

function TodoList() {
	const [todoItems, settodoItems] = useState([]);
	const [todoInput, settodoInput] = useState('');
	const [newTodo, setnewTodo] = useState('');
	const inputRef = useRef(null);
	const styles = {
		Icon: {
			marginLeft: 'auto',
		},
		Paper: {
			margin: '0.1rem auto auto',
			padding: '0.1rem',
			display: 'flex',
			alignItems: 'center',
			marginTop: 10,
			width: 500,
		},
	};
	useEffect(() => {
		async function getTodoItems() {
			const data = await getTodos();
			settodoItems(data);
		}
		getTodoItems();
	}, []);

	useEffect(() => {
		async function getTodoItems() {
			const data = await getTodos();
			settodoItems(data);
		}
		getTodoItems();
	}, [newTodo]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createTodos(todoInput);

		setnewTodo(Math.random());
	};

	const handleTodoChange = async ({ name, id, status }) => {
		await updateTodos(name, id, status);
		setnewTodo(Math.random());
	};

	const renderActionButton = (status) => {
		if (status === 'done') {
			return <UndoRounded color="secondary" />;
		} else {
			return <Check color="primary" />;
		}
	};

	const renderCreateTodo = () => (
		<form onSubmit={handleSubmit} style={{ display: 'flex', width: '50%' }}>
			<Input
				placeholder="Create a Todo"
				inputProps={{
					'aria-label': 'Description',
				}}
				inputRef={inputRef}
				onChange={(e) => settodoInput(e.target.value)}
				style={{ width: '90%' }}
				ref={inputRef}
			/>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				style={{ width: '10%' }}
			>
				Add
			</Button>
		</form>
	);
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{renderCreateTodo()}
			<h1>Todo List</h1>
			{todoItems?.data?.map((item, index) => {
				return (
					<Grid xs={12} item key={index}>
						<Paper elevation={2} style={styles.Paper}>
							<Box
								sx={{
									display: 'flex',
									p: 1,
									m: 1,
									bgcolor: 'background.paper',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									width: '50%',
								}}
							>
								<span
									className={
										item.status === 'done'
											? 'done'
											: 'active'
									}
								>
									{item.todo}
								</span>
								<span
									className={
										item.status === 'done'
											? 'done'
											: 'active'
									}
								>
									{' '}
									Status : {item.status}
								</span>
							</Box>
							<IconButton
								color="primary"
								aria-label="Edit"
								style={styles.Icon}
								onClick={() =>
									handleTodoChange({
										name: item.todo,
										id: item.id,
										status:
											item.status === 'done'
												? 'active'
												: 'done',
									})
								}
							>
								{renderActionButton(item.status)}
							</IconButton>
						</Paper>
					</Grid>
				);
			})}
		</div>
	);
}

export default TodoList;
