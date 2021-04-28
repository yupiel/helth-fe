import { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
	private logoutAccount() {
		localStorage.removeItem('accessToken');

        return <Redirect to='/login'></Redirect>
	}

	render() {
		return (
			<div className='loader'>
				{this.logoutAccount()}
			</div>
		);
	}
}

export default Logout;
