import axios from 'axios';
import { BE_URL } from './utils';

export const getTodos = () => {
	const data = axios.get(`${BE_URL}/api/v1/todo`);
	return data;
};

export const searchTodos = (query) => {
	let data;
	if (query) {
		data = axios.post(`${BE_URL}/api/v1/todo/search`, { item: query });
	}
	return data;
};

export const createTodos = (item) => {
	const data = axios.post(`${BE_URL}/api/v1/todo/create`, { todo: item });
	return data;
};

export const updateTodos = (name, id, status) => {
	const data = axios.post(`${BE_URL}/api/v1/todo/update`, {
		todo: name,
		status,
		id,
	});
	return data;
};
