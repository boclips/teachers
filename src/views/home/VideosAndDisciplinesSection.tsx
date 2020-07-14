import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeViewVideoList } from 'src/views/home/HomeViewVideoList';
import ForwardArrowIcon from '../../../resources/images/forward-arrow.svg';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../components/common/higherOrderComponents/withMediaBreakPoint';
import { DisciplineCardList } from '../../components/disciplines/DisciplineCardList';
import MediaBreakpoints from '../../types/MediaBreakpoints';

const { Content } = Layout;

const DisciplineSection = () => (
  <>
    <DisciplineCardList visibleDisciplines={4} visibleSubjects={4} />
    <Link
      to="/our-subjects"
      className="disciplines-section__all-subjects link--tabbable"
    >
      Explore all subjects <ForwardArrowIcon />
    </Link>
  </>
);

export const VideosAndDisciplinesSection = withMediaBreakPoint(
  (props: WithMediaBreakPointProps) => {
    const screenIsDesktop =
      props.mediaBreakpoint.width > MediaBreakpoints.lg.width;

    return (
      <section className="disciplines-section">
        <Content>
          {screenIsDesktop ? (
            <Row gutter={90}>
              <Col lg={{ span: 8 }}>
                <HomeViewVideoList />
              </Col>
              <Col lg={{ span: 16 }}>
                <DisciplineSection />
              </Col>
            </Row>
          ) : (
            <DisciplineSection />
          )}
        </Content>
      </section>
    );
  },
);
