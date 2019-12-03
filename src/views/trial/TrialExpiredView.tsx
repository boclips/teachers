import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import SadTeacher from '../../../resources/images/sad-teacher.svg';
import PageLayout from '../../components/layout/PageLayout';
import { Link } from '../../types/Link';
import State from '../../types/State';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';

interface StateProps {
  reportAccessExpiredLink: Link;
}

interface DispatchProps {
  redirectToHomepage: () => void;
}

class TrialExpiredViewComponent extends React.PureComponent<
  StateProps & DispatchProps
> {
  public render() {
    if (!this.props.reportAccessExpiredLink) {
      return null;
    }

    return (
      <PageLayout title="Trial over" showNavigation={false} showFooter={true}>
        <section className="illustrated-page">
          <Row>
            <Col sm={{ span: 24 }} md={{ span: 12 }}>
              <section className="illustration">
                <SadTeacher />
              </section>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 12 }}>
              <section className="message">
                <h1 className="big-title">
                  We’re sorry but your trial period is over!
                </h1>
                <p>
                  If you’d like to continue using Boclips for teachers, let us
                  know.
                </p>
                <p className="action">
                  <Button
                    href="https://www.boclips.com/boclips-for-teachers-schedule-a-demo"
                    type="primary"
                    size="large"
                  >
                    Get in touch
                  </Button>
                </p>
              </section>
            </Col>
          </Row>
        </section>
      </PageLayout>
    );
  }

  public componentDidMount(): void {
    if (!this.props.reportAccessExpiredLink) {
      this.props.redirectToHomepage();
    } else {
      // noinspection JSIgnoredPromiseFromCall
      AnalyticsFactory.internalAnalytics().trackUserExpired();
    }
  }
}

const mapStateToProps = (state: State): StateProps => ({
  reportAccessExpiredLink: state.links.reportAccessExpired,
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
  redirectToHomepage: () => dispatch(push('/')),
});

export const TrialExpiredView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrialExpiredViewComponent);
