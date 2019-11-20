import { zip } from 'lodash';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Video } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import { CardContainer } from './CardContainer';
import './SearchResultsCardList.less';

interface Props {
  videos: Video[];
  collections?: VideoCollection[];
  totalElements?: number;
}

export class SearchResultsCardList extends React.PureComponent<Props> {
  public render() {
    return (
      <TransitionGroup exit={true}>
        {zip(this.props.videos, this.props.collections)
          .flat()
          .map((cardContent, index) => {
            return (
              <CSSTransition key={index} classNames="card-list" timeout={500}>
                <div>
                  <CardContainer content={cardContent} searchIndex={index} />
                </div>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
    );
  }
}
