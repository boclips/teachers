import { VideoCollection } from 'src/types/VideoCollection';
import Helmet from 'react-helmet';
import { CollectionHeader } from 'src/components/collection/details/header/CollectionHeader';
import React from 'react';
import { CollectionDetailsEmpty } from 'src/components/collection/details/CollectionDetailsEmpty';
import CollectionCardContainer from 'src/components/collection/card/CollectionCardContainer';

export interface Props {
  collection: VideoCollection;
  userId: string;
}

export const ParentCollectionDetailsContent = (props: Props) => {
  return (
    <section className="collection-view__collection-details">
      <Helmet>
        <title>{props.collection.title}</title>
      </Helmet>
      <CollectionHeader collection={props.collection} />
      {props.collection.subCollections.length === 0 ? (
        <CollectionDetailsEmpty />
      ) : (
        props.collection.subCollections &&
        props.collection.subCollections.map((collection) => {
          console.log(collection);
          return (
            <CollectionCardContainer
              key={collection.id}
              collection={collection}
              grid={false}
            />
          );
        })
      )}
    </section>
  );
};
