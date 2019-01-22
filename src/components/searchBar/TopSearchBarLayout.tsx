import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import boclipsLogo from '../../../resources/images/boclips-logo.png';
import boclipsMiniLogo from '../../../resources/images/boclips-mini-logo.png';
import { LoginState } from '../../types/State';
import { BoclipsFooter } from '../common/BoclipsFooter';
import { LogoutButton } from '../common/LogoutButton';
import SearchBar from './SearchBar';

const { Header, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

interface StateProps {
  authorized: boolean;
}

class TopSearchBarLayout extends PureComponent<Props & StateProps> {
  public renderLogo() {
    return (
      <Link to="/" data-qa="boclips-logo">
        <img className="logo" src={boclipsLogo} />
        <img className="mini-logo" src={boclipsMiniLogo} />
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
          <Header className="fixed">
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
                {this.props.authorized ? <SearchBar /> : null}
              </Col>
              <Col sm={{ span: 12 }} md={{ span: 6 }}>
                {this.renderLogout(this.props.authorized)}
              </Col>
            </Row>
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
}

function mapStateToProps(state: LoginState): StateProps {
  return {
    authorized: state.user && state.user.authenticated,
  };
}

export default connect(mapStateToProps)(TopSearchBarLayout);
