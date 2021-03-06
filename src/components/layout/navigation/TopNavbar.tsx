import { Col, Row } from 'antd';
import Layout from 'antd/lib/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from 'src/components/searchBar/SearchBarWrapper';
import boclipsLogo from '../../../../resources/images/boclips-logo.png';
import BoclipsMobileLogo from '../../../../resources/images/boclips-mobile-logo.svg';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import { NavbarButtonsContainer } from './NavbarButtonsContainer';
import './TopNavbar.less';

interface Props {
  authorized: boolean;
  showSearchBar: boolean;
  isMobile: boolean;
  showNavigation?: boolean;
}

const { Content } = Layout;

export const TopNavbar = React.memo((props: Props) => (
  <>
    <Content className="top-navbar">
      <Row align="middle">
        <Col
          sm={{ span: 24 }}
          md={{ span: 6 }}
          lg={{ span: props.showSearchBar ? 6 : 16 }}
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
            flex="auto"
            xs={{ span: 18 }}
            sm={{ span: 20 }}
            md={{ span: 20 }}
            lg={{ span: 10 }}
          >
            <SearchBar />
          </Col>
        ) : (
          props.isMobile && (
            <Col xs={{ span: 18 }} sm={{ span: 20 }}>
              <section className="mobile-logo-wrapper">
                {props.showNavigation ? (
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
        <Col xs={{ span: 6 }} sm={{ span: 4 }} lg={{ span: 8 }}>
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
    </Content>
  </>
));
