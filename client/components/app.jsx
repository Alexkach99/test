const React = require('react');
const FormEditor = require('./form_editor.jsx');
const FormGrid = require('./grid.jsx');

const FormStore = require('../stores/form_store.js');
const FormActions = require('../actions/form_actions.js');

require('./app.less');

function getStateFromFlux() {
	return {
		isLoading: FormStore.isLoading(),
		forms: FormStore.getForms()
	};
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}
	
	getInitialState() {
		return getStateFromFlux();
	}
	
	componentWillMount() {
		FormActions.loadForms();
	}
	
	componentDidMount() {
		FormStore.addChangeListener(e => this._onChange(e) );
	}
	
	componentWillUnmount() {
		FormStore.removeChangeListener(e => this._onChange(e) );
	}
	
	handleFormAdd(data) {
		FormActions.createForm(data);
	}
	
	handleFormEdit(data) {
		FormActions.editForm(data);
	}
	
	handleFormDelete(form) {
		FormActions.deleteForm(form.id);
	}
	
	render() {
		return <div className="App">
			{
				this.state.isLoading
				?
					<div class="Loading">Loading, please wait...</div>
				:
					null
			}
			<FormEditor onFormAdd={e => this.handleFormAdd(e)} />
			<br/>
			<FormGrid
				forms={this.state.forms}
				onFormEdit={form => this.handleFormEdit(form)}
				onFormDelete={form => this.handleFormDelete(form)}
			/>
		</div>
	}
	
	_onChange() {
		this.setState( getStateFromFlux() );
	}
}

module.exports = App;
