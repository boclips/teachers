import Icon from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import SaveSVG from 'resources/images/save.svg';
import State from 'src/types/State';
import { Video } from 'src/types/Video';
import SavingButton from 'src/components/common/savingButton/SavingButton';
import withPageableCollection, {
  WithPageableCollectionProps,
} from 'src/components/common/higherOrderComponents/withPageableCollection';
import './ManageVideoCollectionButton.less';
import ManageVideCollectionMenuContainer from './ManageVideoCollectionMenuContainer';

interface StateProps {
  updatingCollections: boolean;
  canFetchMyCollections: boolean;
}

export interface OwnProps {
  video: Video;
  icon?: React.ComponentType<any>;
  getPopupContainer?: () => HTMLElement | null;
}

interface InternalState {
  isMenuOpen: boolean;
  isSaving: boolean;
  isUpdatingCollections: boolean;
}

class ManageVideoCollectionsButton extends React.PureComponent<
  StateProps & OwnProps & WithPageableCollectionProps,
  InternalState
> {
  public constructor(
    props: StateProps & OwnProps & WithPageableCollectionProps,
  ) {
    super(props);

    this.state = {
      isMenuOpen: false,
      isSaving: false,
      isUpdatingCollections: false,
    };
  }

  public static getDerivedStateFromProps(
    props: StateProps,
    state: InternalState,
  ): InternalState {
    const collectionsHaveBeenUpdated =
      state.isUpdatingCollections && !props.updatingCollections;

    return {
      ...state,
      isUpdatingCollections: props.updatingCollections,
      isSaving: collectionsHaveBeenUpdated ? false : state.isSaving,
    };
  }

  public render() {
    if (!this.props.canFetchMyCollections || !this.props.collections) {
      return null;
    }

    return (
      <React.Fragment>
        <ManageVideCollectionMenuContainer
          onVisibleChange={() => {
            this.setState({
              isMenuOpen: !this.state.isMenuOpen,
            });
          }}
          video={this.props.video}
          isMenuVisible={this.state.isMenuOpen}
          loading={this.props.loading}
          onChange={() => this.setState({ isSaving: true })}
          collectionKey="myCollections"
          getPopupContainer={this.props.getPopupContainer}
        >
          <SavingButton
            saving={this.state.isSaving}
            data-qa={'video-collection-menu'}
            className={'video-collection-menu'}
            size={'large'}
          >
            <Icon component={this.props.icon || SaveSVG} />
            <span>Save</span>
          </SavingButton>
        </ManageVideCollectionMenuContainer>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ collections, links }: State): StateProps {
  return {
    updatingCollections: collections.updating,
    canFetchMyCollections: links.entries.myCollections && true,
  };
}

export default connect<StateProps, null, OwnProps>(mapStateToProps)(
  withPageableCollection(ManageVideoCollectionsButton),
);
