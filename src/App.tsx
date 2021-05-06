import './App.sass';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Register from './ui/Register';
import Login from './ui/Login';
import Activities from './ui/Activities/Activities';
import Challenges from './ui/Challenges/Challenges';
import Logout from './ui/Logout';
import { HashRouter, Switch } from 'react-router-dom';

function App() {
	return (
		<HashRouter basename={process.env.PUBLIC_URL}>
			<div id='toast-container' />
			<Switch>
				<PublicRoute exact path='/register' component={Register} />
				<PublicRoute exact path='/login' component={Login} />

				<PrivateRoute exact path='/' component={Activities} />
				<PrivateRoute exact path='/challenges' component={Challenges} />
				<PrivateRoute exact path='/logout' component={Logout} />
			</Switch>
		</HashRouter>
	);
}

export default App;
