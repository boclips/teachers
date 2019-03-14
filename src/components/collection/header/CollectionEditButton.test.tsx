import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { VideoCollection } from '../../../types/VideoCollection';
import { editCollectionAction } from '../redux/actions/editCollectionAction';
import CollectionEditButtonContainer from './CollectionEditButtonContainer';

const mockStore = configureStore<{}>();

describe('when can edit collection', () => {
  it('changing the title fires a patch action', () => {
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: 'something', templated: false }),
      }),
    });
    const store = mockStore({});
    const wrapper = mountComponent(collection, store);

    CollectionEditModalHelper.openModal(wrapper);
    CollectionFormHelper.editCollectionText(wrapper, 'test');
    CollectionEditModalHelper.confirmModal(wrapper);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(
      editCollectionAction({
        originalCollection: collection,
        title: 'test',
        isPublic: null,
      }),
    );
  });

  it('changing the visibility of collection fires a patch action', () => {
    const collection = VideoCollectionFactory.sample({
      isPublic: false,
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: 'something', templated: false }),
      }),
    });
    const store = mockStore({});
    const wrapper = mountComponent(collection, store);

    CollectionEditModalHelper.openModal(wrapper);
    CollectionFormHelper.editVisiblity(wrapper, true);
    CollectionEditModalHelper.confirmModal(wrapper);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(
      editCollectionAction({
        originalCollection: collection,
        isPublic: true,
        title: null,
      }),
    );
  });

  it('not editing anything does not lead to a patch action', () => {
    const collection = VideoCollectionFactory.sample({
      isPublic: false,
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: 'something', templated: false }),
      }),
    });
    const store = mockStore({});
    const wrapper = mountComponent(collection, store);

    CollectionEditModalHelper.openModal(wrapper);
    CollectionEditModalHelper.confirmModal(wrapper);

    expect(store.getActions()).toHaveLength(0);
  });
});

describe('When cannot edit collection', () => {
  it('Renders no edit button', () => {
    const collection = VideoCollectionFactory.sample({
      isPublic: false,
      links: VideoCollectionLinksFactory.sample({ edit: null }),
    });
    const store = mockStore({});
    const wrapper = mountComponent(collection, store);

    expect(wrapper.find(By.dataQa('collection-edit-button'))).not.toExist();
  });
});

const mountComponent = (collection: VideoCollection, store) =>
  mount(
    <Provider store={store}>
      <span>
        <CollectionEditButtonContainer collection={collection} />
      </span>
    </Provider>,
  );

export class CollectionFormHelper {
  public static editCollectionText(wrapper, text: string) {
    const events = new EventSimulator(wrapper);
    events.setText(text, wrapper.find(By.dataQa('title-edit', 'input')));
  }

  public static editVisiblity(wrapper, visiblity) {
    wrapper
      .find(By.dataQa('visibility-edit'))
      .find('input')
      .first()
      .simulate('change', { target: { checked: visiblity } });
  }
}
export class CollectionEditModalHelper {
  public static openModal(wrapper) {
    wrapper
      .find(By.dataQa('collection-edit-button'))
      .find('Button')
      .simulate('click');
    return wrapper;
  }

  public static confirmModal(wrapper) {
    const events = new EventSimulator(wrapper);
    events.click(wrapper.findWhere(n => n.text() === 'Save').find('Button'));
    return wrapper;
  }
}
