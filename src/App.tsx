import Register from './ui/Register';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/register'>
					<Register />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
