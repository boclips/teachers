import React from 'react';
import { connect } from 'react-redux';
import { UserCredentials } from '../login/UserCredentials';
import { UserState } from '../State';

interface StateProps {
  user: UserCredentials;
}

const defaultConfig = {};
let currentConfig = defaultConfig;

export const boclipsFetch = (url: string, init?: RequestInit) => {
  return fetch(url, { ...currentConfig, ...init });
};

class FetchProvider extends React.Component<StateProps> {
  public render() {
    return this.props.children;
  }
}

function mapStateToProps(state: UserState): StateProps {
  if (state.user && state.user.valid) {
    const headers = {
      Authorization: `Basic ${btoa(
        state.user.username + ':' + state.user.password,
      )}`,
    };
    currentConfig = { headers };
  } else {
    currentConfig = defaultConfig;
  }
  return {
    user: state.user,
  };
}

export default connect<StateProps>(
  mapStateToProps,
  null,
)(FetchProvider);
