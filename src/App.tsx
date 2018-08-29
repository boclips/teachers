import Tag from 'antd/lib/tag';
import React from 'react';

export default class App extends React.Component {
  public render() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Looks like we are in development mode!', process.env.NODE_ENV);
    }
    return <div id="greetings"><Tag>Hola Ben</Tag></div>;
  }
}
