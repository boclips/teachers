import { Slider } from 'antd';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import {
  MockStoreFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { VideoCollection } from '../../../types/VideoCollection';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';
import { editCollectionAction } from '../redux/actions/editCollectionAction';
import CollectionEditButtonContainer from './CollectionEditButtonContainer';

describe('when can edit collection', () => {
  it('changing the title fires a patch action', () => {
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: 'something', templated: false }),
      }),
    });
    const store = MockStoreFactory.sample();
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
        subjects: null,
        ageRange: null,
      }),
    );
  });

  it('changing the visibility of a collection fires a patch action', () => {
    const collection = VideoCollectionFactory.sample({
      isPublic: false,
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: 'something', templated: false }),
      }),
    });
    const store = MockStoreFactory.sample();

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
        subjects: null,
        ageRange: null,
      }),
    );
  });

  it('changing the subjects of a collection fires a patch action', () => {
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: 'something', templated: false }),
      }),
    });
    const store = MockStoreFactory.sample();

    const wrapper = mountComponent(collection, store);

    CollectionEditModalHelper.openModal(wrapper);
    CollectionFormHelper.editSubjects(wrapper, [
      'subject-one-id',
      'subject-two-id',
    ]);
    CollectionEditModalHelper.confirmModal(wrapper);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(
      editCollectionAction({
        originalCollection: collection,
        isPublic: null,
        title: null,
        subjects: ['subject-one-id', 'subject-two-id'],
        ageRange: null,
      }),
    );
  });

  describe('changing age range of a collection fires a patch', () => {
    it('when age range is an interval', () => {
      const collection = VideoCollectionFactory.sample({
        links: VideoCollectionLinksFactory.sample({
          edit: new Link({ href: 'something', templated: false }),
        }),
        ageRange: '3-9',
      });
      const store = MockStoreFactory.sample();
      const wrapper = mountComponent(collection, store);
      CollectionEditModalHelper.openModal(wrapper);
      const slider = wrapper.find(Slider);
      slider.props().onChange([5, 9]);

      CollectionEditModalHelper.confirmModal(wrapper);
      expect(store.getActions()).toHaveLength(1);
      expect(store.getActions()[0]).toEqual(
        editCollectionAction({
          originalCollection: collection,
          title: null,
          ageRange: '5-9',
          subjects: null,
          isPublic: null,
        }),
      );
    });
    it('when age range is increased to max', () => {
      const collection = VideoCollectionFactory.sample({
        links: VideoCollectionLinksFactory.sample({
          edit: new Link({ href: 'something', templated: false }),
        }),
        ageRange: '11-16',
      });
      const store = MockStoreFactory.sample();
      const wrapper = mountComponent(collection, store);
      CollectionEditModalHelper.openModal(wrapper);
      const slider = wrapper.find(Slider);
      slider.props().onChange([11, 19]);

      CollectionEditModalHelper.confirmModal(wrapper);
      expect(store.getActions()).toHaveLength(1);
      expect(store.getActions()[0]).toEqual(
        editCollectionAction({
          originalCollection: collection,
          title: null,
          ageRange: '11+',
          subjects: null,
          isPublic: null,
        }),
      );
    });
  });

  it('not editing anything does not lead to a patch action', () => {
    const collection = VideoCollectionFactory.sample({
      isPublic: false,
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: 'something', templated: false }),
      }),
    });
    const store = MockStoreFactory.sample();

    const wrapper = mountComponent(collection, store);

    CollectionEditModalHelper.openModal(wrapper);
    CollectionEditModalHelper.confirmModal(wrapper);

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
    const store = MockStoreFactory.sample();

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

  public static editSubjects(wrapper: ReactWrapper, subjectIds: string[]) {
    wrapper.find(SelectSubjects).simulate('click');

    const menuItems = wrapper.find('Trigger').find('MenuItem');

    subjectIds.forEach(subjectId => {
      menuItems.find(`[value="${subjectId}"]`).simulate('click');
    });
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
    events.click(
      wrapper.findWhere(n => n.length && n.text() === 'Save').find('Button'),
    );
    return wrapper;
  }
}
