import { useHistory } from "react-router-dom";

export const withHistoryHook = (Component: any) => {
	return (props: any) => {
		const history = useHistory();

		return <Component history={history} {...props} />;
	};
};