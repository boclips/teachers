import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React from 'react';
import FeatureGate from 'src/components/common/featuresFlags/FeatureGate';
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

const DisciplineSection = ({ screenIsMobile }) => (
  <>
    <DisciplineCardList
      visibleDisciplines={4}
      visibleSubjects={4}
      screenIsMobile={screenIsMobile}
      displaySubjectsLimited={(_) => true}
    />
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

    const screenIsMobile =
      props.mediaBreakpoint.width < MediaBreakpoints.sm.width;
    return (
      <section className="disciplines-section">
        <Content>
          {screenIsDesktop ? (
            <Row gutter={90}>
              <Col lg={{ span: 8 }}>
                <FeatureGate flag="TEACHERS_HOME_SUGGESTED_VIDEOS">
                  <HomeViewVideoList />
                </FeatureGate>
              </Col>
              <Col lg={{ span: 16 }}>
                <FeatureGate flag="TEACHERS_SUBJECTS">
                  <DisciplineSection screenIsMobile={screenIsMobile} />
                </FeatureGate>
              </Col>
            </Row>
          ) : (
            <FeatureGate flag="TEACHERS_SUBJECTS">
              <DisciplineSection screenIsMobile={screenIsMobile} />
            </FeatureGate>
          )}
        </Content>
      </section>
    );
  },
);
