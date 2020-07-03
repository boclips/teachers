import React from 'react';
import './Grid.less';
import c from 'classnames';
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from 'react-infinite-scroll-component';

interface Props extends InfiniteScrollProps {}

export class InfiniteGrid extends React.PureComponent<Props> {
  public render() {
    return (
      <InfiniteScroll
        /* eslint-disable-next-line */
        {...this.props}
        className={c(
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
