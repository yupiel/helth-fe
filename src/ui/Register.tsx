import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import UserAPIService from '../ports/UserAPIService';
import { withHistoryHook } from '../common/HocUtils';

interface RegisterProps {
	history: RouteComponentProps['history'];
	//redirectTo: (path: string) => void;
}

class Register extends React.Component<RegisterProps> {
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
			if (user !== undefined && user.id !== undefined) {
				console.log('Account successfully created'); //TODO toast? delay?

				//redirect to login page on successful register
				this.props.history.push('/login');
				//this.props.redirectTo('/login');
			}
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
							<p className='title is-4'>Register</p>
							<div className='field'>
								<label className='label' htmlFor='username'>
									Username:
								</label>
								<div className='control'>
									<input
										className='input'
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
										type='password'
										name='password'
										placeholder='min. 8 characters'
										onChange={this.changeHandler.bind(this)}
										minLength={8}
										required={true}></input>
								</div>

								<div className='level'>
									<div className='level-left'>
										<p className='subtitle is-6 mt-5'>
											<Link to='/login'>
												Already have an Account? Login!
											</Link>
										</p>
									</div>
									<input
										className='level-right button is-link mt-5'
										type='submit'
										value='Submit'></input>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withHistoryHook(Register);
