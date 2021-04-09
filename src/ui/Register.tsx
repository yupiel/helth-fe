import React from 'react';

class Register extends React.Component {
	render() {
		return (
			<div>
				<p>Register new Account</p>
				<form>
					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						id='username'
						minLength={4}
						required={true}></input>
					<label htmlFor='password'>
						Password (min. 8 characters):
					</label>
					<input
						type='password'
						id='password'
						minLength={8}
						required={true}></input>

					<input type='submit' value='submit'></input>
				</form>
			</div>
		);
	}
}

export default Register;
