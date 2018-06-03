const React = require('react');
const FormEditor = require('./form_editor.jsx');
require('./Form.less');

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}
	
	getInitialState() {
		return {
			editing: false,
			image: this.props.image,
			category: this.props.category,
			title: this.props.title,
			description: this.props.description
		};
	}
	
	handleFormEdit(data) {
		if (this.state.editing) {
			this.setState( Object.assign({ editing: false }, data) );
			
			this.props.onEdit(data);
		} else {
			this.setState({ editing: true });
		}
	}
	
	handleDelete(event) {
		this.setState({deleting: true});
		this.props.onDelete(event);
	}
	
	render() {
		const oldProps = {
			image: this.state.image,
			category: this.state.category,
			title: this.state.title,
			description: this.state.description
		};
		
		return this.state.editing
		?
			<div className="Form">
				<FormEditor editing={true} oldProps={oldProps} onFormEdit={e => this.handleFormEdit(e)} />
			</div>
		:
			<div className="Form">
				{
					this.state.deleting
					?
						'deleting...'
					:
						<button className="Form__del-icon" onClick={e => this.handleDelete(e)}> x </button>
				}
				
				{
					this.state.title
					?
						<h2 className="Form__title">{this.state.title}</h2>
					:
						null
				}
				
				<h3 className="Form__category">{this.state.category}</h3>
				<div className="Form__description">{this.state.description}</div>

				{
					this.state.image
					?
						<img className="Form__image" src={this.state.image} />
					:
						null
				}
				
				<div>
					<button className="Edit__button" onClick={e => this.handleFormEdit(e)}>
						edit
					</button>
				</div>
			</div>
	}
}

module.exports = Form;
