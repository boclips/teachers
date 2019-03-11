import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import boclipsLogo from '../../../resources/images/boclips-logo.png';
import { LoginState } from '../../types/State';
import { BoclipsFooter } from '../common/BoclipsFooter';
import SearchBar from '../searchBar/SearchBar';
import { LogoutButton } from './LogoutButton';
import './NavBar.less';
import ConnectedTabsContainer from './tabs/TabsContainer';

const { Header, Content } = Layout;

interface Props {
  children: React.ReactNode;
  showTabs: boolean;
  showSearchBar?: boolean;
}

interface StateProps {
  authorized: boolean;
}

class NavBar extends PureComponent<Props & StateProps> {
  public static defaultProps = {
    showTabs: false,
    showSearchBar: true,
  };

  public renderLogo() {
    return (
      <Link to="/" data-qa="boclips-logo">
        <img className="logo" src={boclipsLogo} />
      </Link>
    );
  }

  public renderLogout(authorized) {
    if (authorized) {
      return <LogoutButton />;
    }
  }

  public renderMiniLogout(authorized) {
    if (authorized) {
      return <LogoutButton mini={true} />;
    }
  }

  public render() {
    return (
      <Layout>
        <section>
          <Header className="top-search-bar fixed">
            <Row>
              <Col sm={{ span: 24 }} md={{ span: 6 }}>
                <section
                  className={
                    'logo-logout' +
                    (this.props.authorized ? '' : ' unauthenticated')
                  }
                >
                  {this.renderLogo()}
                  {this.renderMiniLogout(this.props.authorized)}
                </section>
              </Col>
              <Col sm={{ span: 24 }} md={{ span: 12 }}>
                {this.showSearchBar() ? <SearchBar /> : null}
              </Col>
              <Col sm={{ span: 12 }} md={{ span: 6 }}>
                {this.renderLogout(this.props.authorized)}
              </Col>
            </Row>
            {this.props.showTabs && <ConnectedTabsContainer />}
          </Header>
          <Content>
            <Row>
              <Col sm={{ span: 24 }} md={{ span: 24 }}>
                {this.props.children}
              </Col>
            </Row>
          </Content>
          <BoclipsFooter />
        </section>
      </Layout>
    );
  }

  private showSearchBar(): boolean {
    return this.props.authorized && this.props.showSearchBar;
  }
}

function mapStateToProps(state: LoginState): StateProps {
  return {
    authorized: state.user && state.user.authenticated,
  };
}

export default connect(mapStateToProps)(NavBar);
