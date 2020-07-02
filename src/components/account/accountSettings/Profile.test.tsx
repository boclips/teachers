import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import By from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import { MockStoreFactory } from '../../../../test-support/factories';
import { AgeRangeTag } from '../../common/tags/AgeRangeTag';
import { SubjectTag } from '../../common/tags/SubjectTag';
import { Profile } from './Profile';

describe('account settings form', () => {
  let wrapper;
  let onClickSpy;
  beforeEach(() => {
    onClickSpy = jest.fn();
    wrapper = mount(
      <Provider store={MockStoreFactory.sample()}>
        <Profile
          firstName="joe"
          lastName="boclips"
          subjects={['subject-one-id']}
          ages={[3, 4, 5]}
          onEdit={onClickSpy}
        />
      </Provider>,
    );
  });

  it('renders the page with existing name, subjects, and age range populated', () => {
    const currentProfile = wrapper.find(By.dataQa('current-profile'));
    const subjectTags = currentProfile.find(By.dataQa('profile-subjects'));
    const ageTags = currentProfile.find(By.dataQa('profile-age-ranges'));

    expect(currentProfile.find(By.dataQa('profile-name')).text()).toEqual(
      'joe boclips',
    );
    expect(subjectTags).toExist();
    expect(subjectTags.children().length).toEqual(1);
    expect(subjectTags.find(SubjectTag).text()).toEqual('subject one');
    expect(ageTags.find(AgeRangeTag).text()).toEqual('3-5');
  });

  it('renders the edit button', () => {
    const currentProfile = wrapper.find(By.dataQa('current-profile'));
    const events = new EventSimulator(wrapper);
    const editButton = currentProfile.find(
      By.dataQa('profile-edit-button', 'button'),
    );
    events.click(editButton);

    expect(editButton).toExist();
    expect(onClickSpy).toHaveBeenCalled();
  });
});
