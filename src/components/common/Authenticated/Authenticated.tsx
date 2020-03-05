import { useSelector } from 'react-redux';
import { isAuthenticated } from 'src/app/redux/authentication/selectors';

export const Authenticated = props => {
  const authenticated = useSelector(isAuthenticated);

  if (authenticated) {
    return props.children;
  }

  return null;
};
