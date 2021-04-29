import { Redirect, Route } from 'react-router';
import { isAuthTokenValid } from './common/AuthUtils';
import Navbar from './ui/Navbar/Navbar';

class PrivateRoute extends Route {
	private authPath: string = '/login';

	render() {
		if (isAuthTokenValid()) {
			return (
				<>
					<Navbar />
					<Route {...this.props} />
				</>
			);
		} else {
			const routeComponent = () => <Redirect to={this.authPath} />;
			return <Route {...this.props} component={routeComponent} />;
		}
	}
}

export default PrivateRoute;
