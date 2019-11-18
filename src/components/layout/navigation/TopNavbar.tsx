import { Col, Row } from 'antd';
import Layout from 'antd/lib/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import boclipsLogo from '../../../../resources/images/boclips-logo.png';
import BoclipsMobileLogo from '../../../../resources/images/boclips-mobile-logo.svg';
import SearchBar from '../../searchBar/SearchBar';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import ConnectedTabsContainer from '../tabs/TabsContainer';
import NavbarButtonsContainer from './NavbarButtonsContainer';
import './TopNavbar.less';

interface Props {
  showTabs: boolean;
  authorized: boolean;
  showSearchBar: boolean;
  isMobile: boolean;
  showNavigation?: boolean;
}

const { Content } = Layout;

const TopNavbar = React.memo((props: Props) => (
  <React.Fragment>
    <Content className="top-navbar">
      <Row>
        <Col
          sm={{ span: 24 }}
          md={{ span: 6 }}
          lg={{ span: props.showSearchBar ? 6 : 18 }}
        >
          <section className="logo-wrapper">
            {props.showNavigation ? (
              <Link to="/" data-qa="boclips-logo" className="link--tabbable">
                <img className="logo" src={boclipsLogo} alt="Boclips" />
              </Link>
            ) : (
              <img className="logo" src={boclipsLogo} alt="Boclips" />
            )}
          </section>
        </Col>
        {props.showSearchBar ? (
          <Col
            xs={{ span: 18 }}
            sm={{ span: 20 }}
            md={{ span: 20 }}
            lg={{ span: 12 }}
          >
            <SearchBar />
          </Col>
        ) : (
          props.isMobile && (
            <Col xs={{ span: 18 }} sm={{ span: 20 }}>
              <section className="mobile-logo-wrapper">
                {!props.showNavigation ? (
                  <Link
                    to="/"
                    data-qa="boclips-logo"
                    className="link--tabbable"
                  >
                    <BoclipsMobileLogo alt="Boclips" />
                  </Link>
                ) : (
                  <BoclipsMobileLogo alt="Boclips" />
                )}
              </section>
            </Col>
          )
        )}
        <Col xs={{ span: 6 }} sm={{ span: 4 }} lg={{ span: 6 }}>
          {props.authorized && props.showNavigation && (
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

export default TopNavbar;
