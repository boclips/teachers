import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import {
  CollectionsFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import withPageableCollection, {
  WithPageableCollectionProps,
} from './withPageableCollection';

it('renders child component', () => {
  const store = MockStoreFactory.sample();

  const nestedComponent = <div>hello</div>;
  const WithPageableCollectionComponent = withPageableCollection(
    () => nestedComponent,
  );
  const wrapper = mount(
    <Provider store={store}>
      <WithPageableCollectionComponent collectionKey="myCollections" />
    </Provider>,
  );

  expect(wrapper.find('div').text()).toEqual('hello');
});

it('gets correct state from store', () => {
  const myCollections = PageableCollectionsFactory.sample({
    items: [VideoCollectionFactory.sample().id],
    links: {
      next: new Link({ href: 'yes', templated: false }),
    },
  });
  const store = MockStoreFactory.sample({
    collections: CollectionsFactory.sample({
      myCollections,
    }),
  });

  const nestedComponent = <div>hello</div>;
  const WithPageableCollectionComponent = withPageableCollection(
    () => nestedComponent,
  );
  const wrapper = mount(
    <Provider store={store}>
      <WithPageableCollectionComponent collectionKey="myCollections" />
    </Provider>,
  );

  const hocProps = wrapper
    .find('div')
    .parent()
    .props() as WithPageableCollectionProps;

  expect(hocProps.collections).toHaveLength(1);
  expect(hocProps.hasMoreCollections).toBe(true);
});

it('renders child component with correct props', () => {
  const store = MockStoreFactory.sample();

  const WithPageableCollectionComponent = withPageableCollection<ButtonProps>(
    props => <Button {...props} />,
  );

  const wrapper = mount(
    <Provider store={store}>
      <WithPageableCollectionComponent
        size="large"
        collectionKey="myCollections"
      />
    </Provider>,
  );

  expect(wrapper.find(Button).prop('size')).toEqual('large');
});
