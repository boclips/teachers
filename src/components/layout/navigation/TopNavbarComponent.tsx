import { Col, Row } from 'antd';
import Layout from 'antd/lib/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import boclipsLogo from '../../../../resources/images/boclips-logo.png';
import SearchBar from '../../searchBar/SearchBar';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import ConnectedTabsContainer from '../tabs/TabsContainer';
import NavbarButtonsContainer from './NavbarButtonsContainer';

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
        <Col
          sm={{ span: 24 }}
          md={{ span: 6 }}
          lg={{ span: 5 }}
          className={'navbar__col'}
        >
          <section className="logo-wrapper">
            <Link to="/" data-qa="boclips-logo" className="link--tabbable">
              <img className="logo" src={boclipsLogo} alt="Boclips" />
            </Link>
          </section>
        </Col>
        <Col
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 12 }}
          className={'navbar__col'}
        >
          {props.showSearchBar ? <SearchBar /> : null}
        </Col>
        <Col
          xs={{ span: 4 }}
          sm={{ span: 4 }}
          md={{ span: 6 }}
          className={'navbar__col'}
        >
          {props.authorized && (
            <div>
              {props.isMobile ? (
                <AccountMenuContainer />
              ) : (
                <NavbarButtonsContainer />
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
