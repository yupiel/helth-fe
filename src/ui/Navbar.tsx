import { Component } from 'react';
import { Link } from 'react-router-dom';

//eslin
class Navbar extends Component {
	render() {
		return (
			<nav className='navbar' role='navigation'>
				<div className='navbar-brand'>
					<div className='navbar-item has-dropdown is-hoverable'>
						<a className='navbar-link' href='#/'>
							Menu
						</a>

						<div className='navbar-dropdown'>
							<Link to='/' className='navbar-item'>
								Activities
							</Link>
							<Link to='/challenges' className='navbar-item'>
								Challenges
							</Link>
							<Link to='/' className='navbar-item'>
								Account
							</Link>
							<hr className='navbar-divider' />
							<Link to='/logout' className='navbar-item'>
								Logout
							</Link>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
