import { Redirect, Route, RouteProps } from 'react-router';
import { isAuthTokenValid } from './common/AuthUtils';

interface PublicRouteProps extends RouteProps {
	//redirectTo: (path: string) => void;
}

class PublicRoute extends Route<PublicRouteProps> {
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
			//<Route
			//	path={this.props.location?.pathname}
			//	component={() => (
			//		<this.Component redirectTo={this.props.redirectTo} />
			//	)}
			///>
		}
	}
}

export default PublicRoute;
