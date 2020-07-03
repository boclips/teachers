import { VideoCollection } from 'src/types/VideoCollection';
import { Link } from 'react-router-dom';
import React from 'react';
import './CollectionUnits.less';
import BulletSVG from 'resources/images/bullet.svg';
import { useRefererIdInjector } from 'src/hooks/useRefererIdInjector';

export interface Props {
  units: VideoCollection[];
}

export const CollectionUnits = (props: Props) => {
  const referer = useRefererIdInjector();
  const refererParam = referer ? `?referer=${referer}` : '';

  return (
    <div className="collection-unit-list" data-qa="collection-unit-list">
      <h1 className="collection-unit-list__heading">Units</h1>
      <ul>
        {props.units.map((collection) => (
          <li key={collection.id}>
            <BulletSVG />{' '}
            <Link
              to={`/collections/${collection.id}${refererParam}`}
              data-qa="collection-unit-title"
            >
              {collection.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
