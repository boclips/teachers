import { VideoCollection } from 'src/types/VideoCollection';
import withPageableCollection, {
  WithPageableCollectionProps,
} from 'src/components/common/higherOrderComponents/withPageableCollection';
import React from 'react';
import { Icon, Checkbox, Menu, Input, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Video } from 'src/types/Video';
import AddSVG from 'resources/images/add.svg';
import { CreateCollectionRequest } from 'src/services/collections/createCollection';

interface Props {
  onVisibleChange: (visible: boolean) => void;
  onCreateCollection: (request: CreateCollectionRequest) => void;
  video: Video;
  onRemoveFromCollection: (collection: VideoCollection) => void;
  onAddToCollection: (collection: VideoCollection) => void;
}

const ManageVideCollectionMenu = (
  props: Props & WithPageableCollectionProps,
) => {
  const [newCollectionTitle, setNewCollectionTitle] = React.useState<
    string | null
  >();
  const [createCollectionVisible, setCreateCollectionVisible] = React.useState<
    boolean
  >(false);

  const createCollection = React.useCallback(() => {
    props.onVisibleChange(false);

    props.onCreateCollection({
      title: newCollectionTitle,
      videos: [props.video],
    });
  }, [props, newCollectionTitle]);

  const handleTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewCollectionTitle(e.target.value);
    },
    [setNewCollectionTitle],
  );

  const onSelectingCollection = (
    alreadyInCollection: boolean,
    collection: VideoCollection,
  ) => () => {
    if (alreadyInCollection) {
      props.onRemoveFromCollection(collection);
    } else {
      props.onAddToCollection(collection);
    }
    props.onVisibleChange(false);
  };

  const dataQa = (alreadyInCollection: boolean) => {
    if (alreadyInCollection) {
      return 'remove-from-collection';
    } else {
      return 'add-to-collection';
    }
  };

  if (props.loading || !props.collections) {
    return (
      <section
        data-qa="loading-collections"
        className="manage-video-collection-button__loading-collections"
      >
        <Icon type="loading" />
      </section>
    );
  }

  const collectionItem = (videoCollection: VideoCollection, video: Video) => {
    const alreadyInCollection =
      videoCollection.videoIds.find((v) => v.value === video.id) !== undefined;
    return (
      <Checkbox
        defaultChecked={alreadyInCollection}
        data-qa={dataQa(alreadyInCollection)}
        data-state={videoCollection.title}
        onChange={onSelectingCollection(alreadyInCollection, videoCollection)}
      >
        <span className="manage-video-collection-button__collection-entry">
          {videoCollection.title}
        </span>
      </Checkbox>
    );
  };

  const menuEntries = (props.collections || []).map((collection) => (
    <Menu.Item
      key={collection.id}
      className="manage-video-collection-button__menu-item"
    >
      {collectionItem(collection, props.video)}
    </Menu.Item>
  ));

  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={props.collections.length}
        next={props.fetchNextPage}
        hasMore={props.hasMoreCollections}
        scrollThreshold={0.3}
        hasChildren={props.collections.length > 0}
        loader=""
        scrollableTarget="videoCollectionButtonScroll"
      >
        <Menu
          id="videoCollectionButtonScroll"
          className="manage-video-collection-button__menu-container"
        >
          {menuEntries}
        </Menu>
      </InfiniteScroll>
      <div
        className="manage-video-collection-button__create-collection-container"
        key="option-create-collection"
        onClick={(e) => e.preventDefault()}
      >
        {createCollectionVisible ? (
          <section>
            <Input
              className="manage-video-collection-button__title-input"
              type="text"
              placeholder="Enter collection name"
              onChange={handleTitleChange}
              data-qa="new-collection-title"
              onPressEnter={createCollection}
            />
            <Button
              htmlType="button"
              className="manage-video-collection-button__create-collection-button"
              type="primary"
              data-qa="create-collection-button"
              onClick={createCollection}
            >
              Create
            </Button>
          </section>
        ) : (
          <section
            data-qa="create-collection"
            className="manage-video-collection-button__create-collection"
            onClick={() => setCreateCollectionVisible(true)}
          >
            <span
              className={
                'manage-video-collection-button__create-collection-icon'
              }
            >
              <Icon component={AddSVG} />
            </span>

            <span>New video collection</span>
          </section>
        )}
      </div>
    </React.Fragment>
  );
};

export default withPageableCollection<Props>(ManageVideCollectionMenu);
