import React from 'react';
import './CollectionBanner.less';

export interface Props {
  image: React.ReactNode;
  title: string;
  subtitle: string;
}
export const CollectionBanner = (props: Props) => (
  <div className="collection-banner">
    <div className="collection-banner__content">
      <div className="collection-banner__headings">
        <div className="collection-banner__title">{props.title}</div>
        <div className="collection-banner__subtitle">{'Social Media'}</div>
      </div>
      <div className="collection-banner__image">{props.image}</div>
    </div>
  </div>
);
