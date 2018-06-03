const AppDispatcher = require('../dispatcher/index.js');
const Constants = require('../constants/index.js');
const api = require('../api/index.js');

module.exports = {
	loadForms() {
		AppDispatcher.dispatch({
			type: Constants.LOAD_FORM_REQUEST
		});
		
		api.listForms()
		.then( ({data}) => {
			AppDispatcher.dispatch({
				type: Constants.LOAD_FORMS_SUCCESS,
				forms: data
			});
		}, err => {
			AppDispatcher.dispatch({
				type: Constants.LOAD_FORMS_FAIL,
				error: err
			});
		});
	},
	
	createForm(form) {
		api.createForm(form)
		.then(res => {
			this.loadForms();
		}, console.error);
	},
	
	editForm(form) {
		api.editForm(form)
		.then(res => {
			this.loadForms();
		}, console.error);
	},
	
	deleteForm(formId) {
		api.deleteForm(formId)
		.then(res => {
			this.loadForms();
		}, console.error);
	}
}
