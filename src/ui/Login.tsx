import React, { Component } from 'react'
import UserAPIService from '../ports/UserAPIService';

class Login extends Component {
    state = {
		username: '',
		password: '',
	};

	private changeHandler(event: React.FormEvent<HTMLInputElement>): void {
		console.log(event.currentTarget.name)
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value,
		});
		console.log(this.state)
	}

	private submitHandler(event: React.SyntheticEvent): void {
		event.preventDefault();

		UserAPIService.loginUser(
			this.state.username,
			this.state.password
		).then((responseMessage) => {
			if (responseMessage !== undefined)
				console.log(responseMessage);	//TODO toast?
		});
	}

    render() {
        return (
            <div>
                <p>Log in: </p>
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
						onChange={this.changeHandler.bind(this)}
						minLength={8}
						required={true}></input>

					<input type='submit' value='Submit'></input>
				</form>
            </div>
        )
    }
}

export default Login