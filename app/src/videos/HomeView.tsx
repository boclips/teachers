import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import SearchBar from './search-videos/SearchBar';

export default class HomeView extends PureComponent {
  public render() {
    return (
      <Layout>
        <section data-qa="home-page">
          <SearchBar />
        </section>
      </Layout>
    );
  }
}
