import React from 'react';
import UserAPIService from '../ports/UserAPIService';

class Register extends React.Component {
	state = {
		username: '',
		password: '',
	};

	private changeHandler(event: React.FormEvent<HTMLInputElement>): void {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value,
		});
	}

	private submitHandler(event: React.SyntheticEvent): void {
		event.preventDefault();

		UserAPIService.registerUser(
			this.state.username,
			this.state.password
		).then((user) => {
			if (user !== undefined && user.id !== undefined)
				console.log('Account successfully created');	//TODO toast?
		});
	}

	render() {
		return (
			<div>
				<p>Register new Account</p>
				<form onSubmit={this.submitHandler.bind(this)}>
					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						name='username'
						onChange={this.changeHandler.bind(this)}
						minLength={4}
						required={true}></input>
					<br/>
					<label htmlFor='password'>
						Password:
					</label>
					<input
						type='password'
						name='password'
						placeholder='min. 8 characters'
						onChange={this.changeHandler.bind(this)}
						minLength={8}
						required={true}></input>

					<input type='submit' value='Submit'></input>
				</form>
			</div>
		);
	}
}

export default Register;
