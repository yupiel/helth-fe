import Register from './ui/Register';
import Login from './ui/Login';
import Activities from './ui/Activities/Activities'
import Challenges from './ui/Challenges/Challenges'
//@ts-ignore
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
	return (
		<Router>
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
			</Switch>
		</Router>
	);
}

export default App;
