import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import ForwardArrowIcon from '../../../resources/images/forward-arrow.svg';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../components/common/higerOrderComponents/withMediaBreakPoint';
import DisciplineCardList from '../../components/disciplines/DisciplineCardList';
import MediaBreakpoints from '../../types/MediaBreakpoints';
import HomeViewVideoList from './HomeViewVideoList';

const { Content } = Layout;

export const VideosAndDisciplinesSection = withMediaBreakPoint(
  (props: WithMediaBreakPointProps) => {
    const disciplineSection = (
      <React.Fragment>
        <DisciplineCardList limit={4} />
        <Link
          to={'/our-subjects'}
          className={'disciplines-section__all-subjects'}
        >
          Explore all subjects <ForwardArrowIcon />
        </Link>
      </React.Fragment>
    );

    let toRender;
    if (props.mediaBreakpoint.width > MediaBreakpoints.lg.width) {
      toRender = (
        <Row gutter={90}>
          <Col lg={{ span: 8 }}>
            <HomeViewVideoList />
          </Col>
          <Col lg={{ span: 16 }}>{disciplineSection}</Col>
        </Row>
      );
    } else {
      toRender = disciplineSection;
    }

    return (
      <section className="disciplines-section">
        <Content>{toRender}</Content>
      </section>
    );
  },
);
