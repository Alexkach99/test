const mongoose = require('mongoose');
require('../models/model.js');
const Form = mongoose.model('Form');
const fs = require('fs');

module.exports = {
	setUpConnection() {
		mongoose.connect('mongodb://localhost/forms');
	},
	
	async listForms() {
		const forms = await Form.find();
		const result = [];
		for (const form of forms) {
			if (form.image.data && form.image.data.length > 0) {
				var base64string = form.image.data.toString('base64');
			}
			const newForm = Object.assign({}, form);
			newForm.image = base64string;
			result.push(newForm);
		}
		
		return result;
	},
	
	createForm(data) {
		if (data.image) {
			const split = data.image.split(',');
			const base64string = split[1];
			var buffer = Buffer.alloc(base64string.length);
			buffer.write(base64string, 0, base64string.length, 'base64');
		}
		const form = new Form({
			category: data.category,
			title: data.title,
			description: data.description
		});
		form.image.data = buffer;
		
		return form.save();
	},
	
	editForm(data) {
		if (data.image) {
			const split = data.image.split(',');
			const base64string = split[1];
			var buffer = Buffer.alloc(base64string.length);
			buffer.write(base64string, 0, base64string.length, 'base64');
		}
		return Form.update( {_id: data.id}, buffer ? Object.assign(data, {image: {data: buffer}}) : data );
	},
	
	deleteForm(id) {
		return Form.findById(id).remove();
	}
};