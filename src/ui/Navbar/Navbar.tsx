import { Component } from 'react';
import NavigationMenu from './NavigationMenu';

class Navbar extends Component {
	render() {
		return (
			<nav className='navbar' role='navigation'>
				<div className='navbar-brand'>
					<NavigationMenu />
				</div>
			</nav>
		);
	}
}

export default Navbar;
