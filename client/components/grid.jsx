const React = require('react');
const Form = require('./form.jsx');

require('./grid.less');

class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}
	
	getInitialState() {
		return {
			
		};
	}
	
	handleTitleChange(event) {
		this.setState({ title: event.target.value });
	}
	
	render() {
		return <div className="Grid">
		<div className="Grid__search">
			<input
				type="text"
				placeholder="Search by title"
				value={this.state.title}
				onChange={e => this.handleTitleChange(e)}
			/>
			<button type="Grid__clear-search" onClick={() => this.setState({ title: '' })}>x</button>
		</div>
		{
			this.props.forms.filter(form => this.state.title ? form.title.indexOf(this.state.title) !== -1 : true)
			.map(form =>
				<Form
					key={form.id}
					image={form.image}
					category={form.category}
					title={form.title}
					description={form.description}
					onDelete={() => this.props.onFormDelete(form)}
					onEdit={edited => {
						this.props.onFormEdit( Object.assign(edited, {id: form.id}) )
					}}
				>
				</Form>
			)
		}
		</div>
	}
}

module.exports = Grid;
