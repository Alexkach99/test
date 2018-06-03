const axios = require('axios');

//const apiPrefix = 'http://localhost:8080/';
const apiPrefix = location.href;

module.exports = {
	listForms() {
		return axios.get(`${apiPrefix}forms`);
	},
	createForm(data) {
		return axios.post(`${apiPrefix}forms`, data);
	},
	editForm(data) {
		return axios.put(`${apiPrefix}forms`, data);
	},
	deleteForm(formId) {
		return axios.delete(`${apiPrefix}forms/${formId}`);
	}
};