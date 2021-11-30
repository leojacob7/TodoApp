const express = require('express');
require('dotenv').config();
const cors = require('cors');
const todoRoutes = require('./routes/todo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/todo', todoRoutes);

app.listen(3002, () => {
	console.log('listening on port 3000');
});
