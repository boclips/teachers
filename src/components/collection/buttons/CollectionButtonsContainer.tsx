import React from 'react';
import MediaBreakpoints, { Breakpoint } from 'src/types/MediaBreakpoints';
import { VideoCollection } from 'src/types/VideoCollection';
import './CollectionButtonsContainer.less';
import { ButtonRow } from 'src/components/common/buttons/ButtonRow';
import { CollectionShareButton } from 'src/components/collection/sharing/CollectionShareButton/CollectionShareButton';
import BookmarkCollectionButton from 'src/components/collection/buttons/bookmark/BookmarkCollectionButton';
import { ButtonMenu } from 'src/components/common/buttons/ButtonMenu';
import { useMediaBreakPoint } from 'src/hooks/useMediaBreakPoint';
import { EditCollectionButton } from './EditCollectionButton';

interface Props {
  collection: VideoCollection;
  desktopVisible?: boolean;
  tabletVisible?: boolean;
  overrideBreakpoint?: Breakpoint;
}

export const CollectionButtonsContainer = ({
  collection,
  overrideBreakpoint,
  desktopVisible = true,
  tabletVisible = true,
}: Props) => {
  const actualBreakpoint = useMediaBreakPoint();

  const viewIsTablet =
    (overrideBreakpoint || actualBreakpoint).width < MediaBreakpoints.lg.width;

  if (viewIsTablet) {
    if (!tabletVisible) {
      return null;
    }
    return (
      <ButtonMenu
        buttons={[
          <CollectionShareButton key="share" collection={collection} />,
          <BookmarkCollectionButton key="bookmark" collection={collection} />,
          <EditCollectionButton key="edit" collection={collection} />,
        ]}
      />
    );
  }

  if (desktopVisible) {
    return (
      <ButtonRow
        leftButtons={[
          <CollectionShareButton key="share" collection={collection} />,
          <BookmarkCollectionButton key="bookmark" collection={collection} />,
        ]}
        rightButtons={[
          <EditCollectionButton key="edit" collection={collection} />,
        ]}
      />
    );
  }

  return null;
};
