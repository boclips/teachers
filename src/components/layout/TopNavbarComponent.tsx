import { Col, Layout, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import boclipsLogo from '../../../resources/images/boclips-logo.png';
import SearchBar from '../searchBar/SearchBar';
import { AccountMenuContainer } from './accountMenu/AccountMenuContainer';
import ConnectedTabsContainer from './tabs/TabsContainer';

interface Props {
  showTabs: boolean;
  authorized: boolean;
  showSearchBar: boolean;
}
const TopNavbarComponent = React.memo((props: Props) => (
  <React.Fragment>
    <Layout.Content>
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 6 }}>
          <section>
            <Link to="/" data-qa="boclips-logo">
              <img className="logo" src={boclipsLogo} />
            </Link>
          </section>
        </Col>
        <Col xs={{ span: 19 }} sm={{ span: 20 }} md={{ span: 12 }}>
          {props.showSearchBar ? <SearchBar /> : null}
        </Col>
        <Col xs={{ span: 5 }} sm={{ span: 4 }} md={{ span: 6 }}>
          {props.authorized && <AccountMenuContainer />}
        </Col>
      </Row>
      {props.showTabs && <ConnectedTabsContainer data-qa="navbar-tabs" />}
    </Layout.Content>
  </React.Fragment>
));

export default TopNavbarComponent;
