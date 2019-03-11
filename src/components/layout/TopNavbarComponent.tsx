import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import boclipsLogo from '../../../resources/images/boclips-logo.png';
import SearchBar from '../searchBar/SearchBar';
import { LogoutButton } from './LogoutButton';
import ConnectedTabsContainer from './tabs/TabsContainer';

interface Props {
  showTabs: boolean;
  authorized: boolean;
  showSearchBar: boolean;
}
const TopNavbarComponent = React.memo((props: Props) => (
  <React.Fragment>
    <Row>
      <Col sm={{ span: 24 }} md={{ span: 6 }}>
        <section
          className={
            'logo-logout' + (props.authorized ? '' : ' unauthenticated')
          }
        >
          <Link to="/" data-qa="boclips-logo">
            <img className="logo" src={boclipsLogo} />
          </Link>
          {props.authorized && <LogoutButton mini={true} />}
        </section>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 12 }}>
        {props.showSearchBar ? <SearchBar /> : null}
      </Col>
      <Col sm={{ span: 12 }} md={{ span: 6 }}>
        {props.authorized && <LogoutButton />}
      </Col>
    </Row>
    {props.showTabs && <ConnectedTabsContainer data-qa="navbar-tabs" />}
  </React.Fragment>
));

export default TopNavbarComponent;
