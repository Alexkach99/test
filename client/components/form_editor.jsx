const React = require('react');

require('./form_editor.less');

class FormEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}
	
	getInitialState() {
		return this.props.oldProps || {
			image: null,
			category: '',
			title: '',
			description: ''
		};
	}
	
	handleImageChange(event) {
		const input = event.target;
		
		if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ image: reader.result, imgInp: input });
            };

            reader.readAsDataURL(input.files[0]);
        }
	}
	
	handleCategoryChange(event) {
		return this.handleChange('category', event);
	}
	
	handleTitleChange(event) {
		return this.handleChange('title', event);
	}
	
	handleDescriptionChange(event) {
		return this.handleChange('description', event);
	}
	
	handleChange(property, event) {
		this.setState({ [property]: event.target.value });
	}
	
	handleFormAdd() {
		const newForm = {
			image: this.state.image,
			category: this.state.category,
			title: this.state.title,
			description: this.state.description
		}
		
		this.props.onFormAdd(newForm);
		if ('imgInp' in this.state) {
			this.state.imgInp.value = '';
		}
		this.setState( this.getInitialState() );
	}
	
	handleFormEdit() {
		const editedForm = {
			image: this.state.image,
			category: this.state.category,
			title: this.state.title,
			description: this.state.description
		}
		
		this.props.onFormEdit(editedForm);
	}
	
	render() {
		const id = Math.random();
		return <div className="FormEditor">
			<div>
				<input
					type="text"
					className="FormEditor__title"
					placeholder="Enter title"
					value={this.state.title}
					onChange={e => this.handleTitleChange(e)}
				/>
			</div>
			<div>
				<input
					type="text"
					className="FormEditor__category"
					placeholder="Enter category"
					value={this.state.category}
					onChange={e => this.handleCategoryChange(e)}
				/>
			</div>
			<div>
				<textarea
					className="FormEditor__description"
					placeholder="Enter description"
					rows={5}
					value={this.state.description}
					onChange={e => this.handleDescriptionChange(e)}
				/>
			</div>
				{
					this.state.image
					?
						<div><img className="FormEditor__image" id="image" src={this.state.image} /></div>
					:
						null
				}
			<div>
				<input
					type="file"
					id={"selectedFile" + id}
					className="FormEditor__image-input"
					accept="image/*"
					style={{display: 'none'}}
					onChange={e => this.handleImageChange(e)}
				/>
				<button type="button" onClick={() => document.getElementById('selectedFile' + id).click()}>Select image</button>
			</div>
			<div className="FormEditor__footer">
				<button
					className="FormEditor__button"
					disabled={!(this.state.image || this.state.category || this.state.title || this.state.description)}
					onClick={e => {
						if (this.props.editing) {
							this.handleFormEdit(e)
						} else {
							this.handleFormAdd(e)
						}
					}}
				>
					{this.props.editing ? 'Apply' : 'Add'}
				</button>
			</div>
		</div>
	}
}

module.exports = FormEditor;
