import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import UserAPIService from '../ports/UserAPIService';
import { withHistoryHook } from '../common/HocUtils';
import { createToast } from '../common/Toaster';

interface LoginProps {
	history: RouteComponentProps['history'];
}

class Login extends Component<LoginProps> {
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

		UserAPIService.loginUser(this.state.username, this.state.password)
			.then((responseMessage) => {
				if (responseMessage !== undefined) {
					if (responseMessage.token !== '') {
						createToast('Successfully Logged in', 'is-success');

						//redirect on successful login
						this.props.history.push('/');
					}
				}
			})
			.catch(() => {
				createToast('Login failed', 'is-danger');
			});
	}

	render() {
		return (
			<div className='hero is-fullpage is-clipped'>
				<div className='hero-body columns is-vcentered is-centered'>
					<div className='column is-one-quarter'>
						<form
							className='box'
							onSubmit={this.submitHandler.bind(this)}>
							<p className='title is-4'>Login</p>
							<div className='field'>
								<label className='label' htmlFor='username'>
									Username:
								</label>
								<div className='control'>
									<input
										className='input'
										data-cy='username'
										type='text'
										name='username'
										onChange={this.changeHandler.bind(this)}
										minLength={4}
										required={true}></input>
								</div>
							</div>

							<div className='field'>
								<label className='label' htmlFor='password'>
									Password:
								</label>
								<div className='control'>
									<input
										className='input'
										data-cy='password'
										type='password'
										name='password'
										onChange={this.changeHandler.bind(this)}
										minLength={8}
										required={true}></input>
								</div>
							</div>

							<div className='level'>
								<div className='level-left'>
									<p className='subtitle is-6 mt-5'>
										<Link to='/register'>
											New? Register Here!
										</Link>
									</p>
								</div>
								<input
									className='level-right button is-link mt-5'
									data-cy='submit'
									type='submit'
									value='Submit'></input>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withHistoryHook(Login);
