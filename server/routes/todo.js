const express = require('express');
const elasticsearch = require('elasticsearch');

const router = express.Router();
const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');
var esClient = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace',
});
router.post('/create', async (req, res) => {
	try {
		const { todo } = req.body;

		if (!todo) {
			throw new Error('Todo is required');
		}

		const id = uuidv4();
		// save to mysql server
		db.promise().query(
			`INSERT INTO todo (id, todo, status) VALUES ('${id}', '${todo}', 'active')`
		);

		const response = await esClient.index({
			index: 'todo',
			// id: '1',
			body: {
				todo: todo,
				status: 'active',
				id: id,
			},
		});

		res.json(response);
	} catch (error) {
		res.status(400).json({
			error: `Todo item error: ${error}`,
		});
	}
});

router.post('/search', async (req, res) => {
	try {
		const { item } = req.body;
		const searchResponse = await esClient.search({
			index: 'todo',
			body: {
				query: {
					match: { todo: item.trim() },
				},
			},
		});
		console.log(`searchResponse`, searchResponse);
		res.json({ results: searchResponse });
	} catch (error) {
		res.status(400).json({
			error,
		});
	}
});

router.get('/', async (req, res) => {
	try {
		const data = await db
			.promise()
			.query(`SELECT TODO, status, id FROM todo`);

		const result = data[0].map((item) => {
			return {
				todo: item['TODO'],
				status: item['status'],
				id: item['id'],
			};
		});
		res.json(result);
	} catch (error) {
		res.status(400).json({
			error,
		});
	}
});

router.post('/update', async (req, res) => {
	try {
		let { todo, status, id } = req.body;
		todo = todo.trim();
		if (!id) {
			throw new Error('Todo is required');
		}

		// save to mysql server
		db.promise().query(
			`UPDATE todo
			SET status='${status}'
			WHERE id='${id}';`
		);

		await esClient.updateByQuery(
			{
				index: 'todo',
				// type: type,
				body: {
					query: { match: { id } },
					script: { inline: `ctx._source.status = '${status}'` },
				},
			},
			function (err, result) {
				if (err) {
					console.log(err);
				}
				console.log(`result>>`, result);
				res.json({ esresult: result });
			}
		);
	} catch (error) {
		res.status(400).json({
			error: `Todo item error: ${error}`,
		});
	}
});

module.exports = router;
