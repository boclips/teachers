import { Col, Row } from 'antd';
import React from 'react';
import noResultsIllustration from '../../../../resources/images/no-results-illustration.png';
import './NoResultsView.less';

interface Props {
  query: string | null;
}

interface State {
  isFormSubmitted: boolean;
}

export default class NoResultsView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFormSubmitted: false,
    };
  }

  public render() {
    return (
      <section className="ant-layout-content zero-results">
        <Row>
          <Col xs={{ span: 16, push: 4 }} md={{ span: 12, push: 0 }}>
            <img
              className="ant-col-20"
              src={noResultsIllustration}
              alt="No results illustration"
            />
          </Col>
          <Col xs={24} md={12}>
            <div>
              <h1 data-qa="search-zero-results">
                Oops, we couldn’t find any results that matched your search for{' '}
                <em>{this.props.query}</em>
              </h1>
              <p className="description" data-qa="description">
                We'll look into why we couldn't find any videos matching your
                search.
              </p>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}
