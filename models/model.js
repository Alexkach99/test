const mongoose = require('mongoose');
const {Schema} = mongoose;

const formSchema = new Schema({
	image: {data: Buffer, contentType: String},
	category: {type: String},
	title: {type: String},
	description: {type: String}
});

const Form = mongoose.model('Form', formSchema);