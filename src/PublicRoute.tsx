import { Redirect, Route } from 'react-router';
import { isAuthTokenValid } from './common/AuthUtils';

class PublicRoute extends Route{
	private homePath = '/';

	render() {
		if (isAuthTokenValid()) {
			const routeComponent = () => <Redirect to={this.homePath} />;
			return (
				<Route
					{...this.props}
					component={routeComponent}
				/>
			);
		} else {
			return <Route {...this.props} />;
		}
	}
}

export default PublicRoute;
