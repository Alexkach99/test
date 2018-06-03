'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const db = require('./utils/db_utils.js');
const bodyParser = require('body-parser');
const cors = require('cors');

db.setUpConnection();

app.use( cors({origin: '*'}) );
app.use( bodyParser.json({limit: "50MB"}) );

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});
app.use('/', express.static(__dirname + '/public'));

app.get('/favicon.ico', (req, res) => {
	res.sendFile(__dirname + '/client/favicon.ico');
});

app.get('/forms', (req, res) => {
	db.listForms()
	.then(data => res.send(data));
});

app.post('/forms', (req, res) => {
	db.createForm(req.body)
	.then(data => res.send(data));
});

app.put('/forms', (req, res) => {
	db.editForm(req.body)
	.then(data => res.send(data));
});

app.delete('/forms/:formId', (req, res) => {
	db.deleteForm(req.params.formId)
	.then(data => res.send(data));
});

app.listen(port, () => {
	console.log('Server is listening on ' + port);
});