import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BoclipsFooter } from '../components/BoclipsFooter';
import boclipsLogo from '../images/boclips-logo.png';
import { actionCreatorFactory } from '../redux/actions';
import { LoginState } from '../State';
import SearchBar from './search-videos/SearchBar';

const { Header, Content } = Layout;
export const searchVideosAction = actionCreatorFactory<string>('SEARCH_VIDEOS');

interface Props {
  children: React.ReactNode;
}

interface StateProps {
  authorized: boolean;
}

class TopSearchBarLayout extends PureComponent<Props & StateProps> {
  public renderLogo(authorized) {
    if (authorized) {
      return (
        <Link to="/" data-qa="boclips-logo">
          <img className="logo" src={boclipsLogo} />
        </Link>
      );
    } else {
      return <img className="logo" src={boclipsLogo} />;
    }
  }

  public render() {
    return (
      <Layout>
        <section>
          <Header className="fixed">
            <Row>
              <Col span={8}>{this.renderLogo(this.props.authorized)}</Col>
              <Col span={16}>
                {this.props.authorized ? <SearchBar /> : null}
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={24}>{this.props.children}</Col>
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
    authorized: state.login,
  };
}

export default connect(mapStateToProps)(TopSearchBarLayout);
