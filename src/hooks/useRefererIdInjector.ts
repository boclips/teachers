import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { replace } from 'connected-react-router';
import querystring from 'query-string';
import State from '../types/State';

export const useRefererIdInjector = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const userId = useSelector((state: State) => state.user && state.user.id);
  const params = querystring.parse(location.search);

  useEffect(() => {
    if ((userId || !params.referer) && userId !== params.referer) {
      dispatch(
        replace({
          search: querystring.stringify({
            ...params,
            referer: userId || 'anonymous',
          }),
        }),
      );
    }
  }, [dispatch, params, params.referer, userId]);
};
