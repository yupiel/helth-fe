import './App.sass';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Register from './ui/Register';
import Login from './ui/Login';
import Activities from './ui/Activities/Activities';
import Challenges from './ui/Challenges/Challenges';
import Logout from './ui/Logout';
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';

function App() {
	//const history = useHistory();

	//let redirectTo = (path: string = '/login') => {
	//	history.push(path);
	//};

	return (
		<Router>
			<Switch>
				<PublicRoute
					exact
					path='/register'
					//redirectTo={redirectTo}
					component={Register}
				/>
				<PublicRoute
					exact
					path='/login'
					//redirectTo={redirectTo}
					component={Login}
				/>

				<PrivateRoute exact path='/' component={Activities} />
				<PrivateRoute exact path='/challenges' component={Challenges} />
				<PrivateRoute exact path='/logout' component={Logout} />
			</Switch>
		</Router>
	);
}

export default App;
