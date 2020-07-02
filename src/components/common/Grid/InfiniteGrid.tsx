import React from 'react';
import './Grid.less';
import classnames from 'classnames';
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from 'react-infinite-scroll-component';

interface Props extends InfiniteScrollProps {}

export class InfiniteGrid extends React.PureComponent<Props> {
  public render() {
    return (
      <InfiniteScroll
        {...this.props}
        className={classnames(
          'boclips-grid',
          'boclips-grid--infinite',
          this.props.className,
        )}
        style={{ ...this.props.style, overflow: 'hidden' }}
      >
        {this.props.children}
      </InfiniteScroll>
    );
  }
}
