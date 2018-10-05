import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { UserCredentials } from '../login/UserCredentials';
import { UserState } from '../State';
import { uuid } from '../uuid';

interface StateProps {
  user: UserCredentials;
}

class FetchProvider extends React.Component<StateProps> {
  public render() {
    return this.props.children;
  }

  public componentDidMount() {
    this.setCorrelationIdInterceptor();
  }

  private setCorrelationIdInterceptor() {
    axios.interceptors.request.use(
      config => {
        config.headers['Correlation-ID'] = uuid();
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
}

function mapStateToProps(state: UserState): StateProps {
  if (state.user && state.user.valid) {
    axios.defaults.headers.common = {
      Authorization: `Basic ${btoa(
        state.user.username + ':' + state.user.password,
      )}`,
    };
  } else {
    axios.defaults.headers.common = {};
  }
  return {
    user: state.user,
  };
}

export default connect<StateProps>(
  mapStateToProps,
  null,
)(FetchProvider);
