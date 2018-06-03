const {EventEmitter} = require('events');
const AppDispatcher = require('../dispatcher/index.js');
const Constants = require('../constants/index.js');

const CHANGE_EVENT = 'change';

var _forms = [];
var _loadingError = null;
var _isLoading = true;

function formatForm(form) {
	return {
		image: (form._doc.image && form._doc.image.data) ? 'data:image/png;base64,' + form.image : null,
		category: form._doc.category,
		title: form._doc.title,
		description: form._doc.description,
		id: form._doc._id
	};
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
	isLoading() {
		return _isLoading;
	},
	getForms() {
		return _forms;
	},
	emitChange() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(action => {
	switch(action.type) {
		case Constants.LOAD_FORM_REQUEST:
			_isLoading = true;
			
			TasksStore.emitChange();
			break;
		case Constants.LOAD_FORMS_SUCCESS:
			_isLoading = false;
			_forms = action.forms.map(formatForm);
			_loadingError = null;
			
			TasksStore.emitChange();
			break;
		case Constants.LOAD_FORMS_FAIL:
			_loadingError = action.error;
			
			TasksStore.emitChange();
			break;
		default:
			console.log('No such handler');
	}
});

module.exports = TasksStore;