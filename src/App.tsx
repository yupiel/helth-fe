import './App.sass';
import Navbar from './ui/Navbar'
import Register from './ui/Register';
import Login from './ui/Login';
import Activities from './ui/Activities/Activities';
import Challenges from './ui/Challenges/Challenges';
import Logout from './ui/Logout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div>
				<Navbar />

				<Switch>
					<Route exact path='/register'>
						<Register />
					</Route>
					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/'>
						<Activities />
					</Route>
					<Route exact path='/challenges'>
						<Challenges />
					</Route>
					<Route exact path='/logout'>
						<Logout />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
