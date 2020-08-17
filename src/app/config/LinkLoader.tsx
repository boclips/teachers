import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import { ErrorView } from '../../views/error/ErrorView';
import State from 'src/types/State';
import { fetchLinksAction } from 'src/app/redux/links/actions/fetchLinksAction';
import { requestAuthentication } from 'src/app/redux/authentication/actions/requestAuthentication';

type Props = { children: any };

export const LinkLoader = (props: Props) => {
  const dispatch = useDispatch();
  const authentication = useSelector((state: State) => state.authentication);
  const links = useSelector((state: State) => state.links);

  const authenticationResolved =
    authentication && authentication.status !== null;
  const linksNotLoaded =
    !links || links.loadingState === null || links.loadingState === 'loading';

  useEffect(() => {
    if (linksNotLoaded && authenticationResolved) {
      dispatch(fetchLinksAction());
    } else {
      dispatch(requestAuthentication({ authenticationRequired: false }));
    }
  }, [authenticationResolved, linksNotLoaded]);

  if (linksNotLoaded) {
    return <LoadingComponent />;
  }

  if (links.loadingState === 'failure') {
    return <ErrorView nonRecoverable />;
  }

  return props.children;
};
