import { PureComponent } from 'react';
import { connect } from 'react-redux';
import State from '../../types/State';

interface Props {
  showWhileLoading: React.ReactNode;
  children: React.ReactNode;
}

interface StateProps {
  loading: boolean;
}

class CollectionsLoaded extends PureComponent<Props & StateProps> {
  public render() {
    return this.props.loading
      ? this.props.showWhileLoading
      : this.props.children || null;
  }
}

const mapStateToProps = (state: State): StateProps => ({
  loading: state.collections.loading,
});

export default connect<StateProps>(mapStateToProps)(CollectionsLoaded);
