import { History, createBrowserHistory } from 'history';
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import BoclipsRouter from '../views/router/BoclipsRouter';
import { LinkLoader } from './config/LinkLoader';
import { createBoclipsStore } from './redux/store';

declare global {
  interface Window {
    Appcues: Appcues;
  }

  interface Appcues {
    identify: (userId: string, user: any) => {};
    page: () => {};
    track: (event: string, payload: any) => {};
  }
}

interface Props {
  apiPrefix: string;
  history?: History;
}

class App extends PureComponent<Props> {
  public static defaultProps = { history: createBrowserHistory() };

  private store = createBoclipsStore(
    {
      apiPrefix: this.props.apiPrefix,
    },
    this.props.history,
  );

  public render() {
    return (
      <>
        <Helmet
          defaultTitle="Boclips for teachers"
          titleTemplate="%s - Boclips for teachers"
        />
        <Provider store={this.store}>
          <LinkLoader>
            <BoclipsRouter history={this.props.history} />
          </LinkLoader>
        </Provider>
      </>
    );
  }
}

export default hot(App);
