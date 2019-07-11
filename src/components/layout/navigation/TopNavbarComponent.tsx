import { Col, Row } from 'antd';
import Layout from 'antd/lib/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import boclipsLogo from '../../../../resources/images/boclips-logo.png';
import SearchBar from '../../searchBar/SearchBar';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import ConnectedTabsContainer from '../tabs/TabsContainer';
import { NavBarButtonsContainer } from './NavBarButtonsContainer';

interface Props {
  showTabs: boolean;
  authorized: boolean;
  showSearchBar: boolean;
  isMobile: boolean;
}

const { Content } = Layout;

const TopNavbarComponent = React.memo((props: Props) => (
  <React.Fragment>
    <Content>
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
          <section>
            <Link to="/" data-qa="boclips-logo">
              <img className="logo" src={boclipsLogo} alt="Boclips" />
            </Link>
          </section>
        </Col>
        <Col xs={{ span: 19 }} sm={{ span: 20 }} md={{ span: 12 }}>
          {props.showSearchBar ? <SearchBar /> : null}
        </Col>
        <Col xs={{ span: 5 }} sm={{ span: 4 }} md={{ span: 6 }}>
          {props.authorized && (
            <div>
              {props.isMobile ? (
                <AccountMenuContainer />
              ) : (
                <NavBarButtonsContainer />
              )}
            </div>
          )}
        </Col>
      </Row>
      {props.showTabs && <ConnectedTabsContainer data-qa="navbar-tabs" />}
    </Content>
  </React.Fragment>
));

export default TopNavbarComponent;
