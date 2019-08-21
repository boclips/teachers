import { shallow } from 'enzyme';
import React from 'react';
import {
  AttachmentFactory,
  VideoCollectionFactory,
} from '../../../../test-support/factories';
import { AgeRange } from '../../../types/AgeRange';
import { AgeRangeTag } from '../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../video/tags/SubjectTag';
import BookmarkingButton from '../buttons/bookmark/BookmarkCollectionButton';
import CollectionButtonsContainer from '../buttons/CollectionButtonsContainer';
import { CollectionSubtitle } from '../CollectionSubtitle';
import { LessonPlan } from '../lessonPlan/LessonPlan';
import CollectionHeader, { Props } from './CollectionHeader';
import CollectionTitle from './CollectionTitle';

type CollectionCardRenderTestData<T = boolean> = Array<{
  mode: Props['mode'];
  expectRendered?: T;
}>;

describe('the title', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details', expectRendered: true },
    { mode: 'card', expectRendered: true },
    { mode: 'tiny-card', expectRendered: true },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does ${expectRendered ? '' : 'not '}render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample({ title: 'hello' });
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      const titleComponent = wrapper.find(CollectionTitle);

      if (expectRendered) {
        expect(titleComponent).toExist();
        expect(titleComponent.props().collection).toEqual(collection);
      } else {
        expect(titleComponent).not.toExist();
      }
    });
  });
});

describe('the bookmark button', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details', expectRendered: true },
    { mode: 'card', expectRendered: true },
    { mode: 'tiny-card', expectRendered: true },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does ${expectRendered ? '' : 'not '}render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample({ title: 'hello' });
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      if (expectRendered) {
        expect(wrapper.find(BookmarkingButton)).toExist();
        expect(
          wrapper
            .find(BookmarkingButton)
            .first()
            .props().collection,
        ).toEqual(collection);
      } else {
        expect(wrapper.find(BookmarkingButton)).not.toExist();
      }
    });
  });
});

describe('the edit collection buttons', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details', expectRendered: true },
    { mode: 'card', expectRendered: true },
    { mode: 'tiny-card', expectRendered: false },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does ${expectRendered ? '' : 'not '}render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample({ title: 'hello' });
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      const buttonContainer = wrapper.find(CollectionButtonsContainer);

      if (expectRendered) {
        expect(buttonContainer).toExist();
        expect(buttonContainer.props().collection).toEqual(collection);
      } else {
        expect(buttonContainer).not.toExist();
      }
    });
  });
});

describe('the subtitle', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details', expectRendered: true },
    { mode: 'card', expectRendered: true },
    { mode: 'tiny-card', expectRendered: false },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does ${expectRendered ? '' : 'not '}render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample({ title: 'hello' });
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      if (expectRendered) {
        expect(wrapper.find(CollectionSubtitle)).toExist();
      } else {
        expect(wrapper.find(CollectionSubtitle)).not.toExist();
      }
    });
  });
});

describe('subject tags when present', () => {
  const subjects = ['hello', 'world'];

  const testData: CollectionCardRenderTestData<number> = [
    { mode: 'details', expectRendered: subjects.length },
    { mode: 'card', expectRendered: 1 },
    { mode: 'tiny-card', expectRendered: 1 },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does render ${expectRendered} of subjects in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample({ subjects });
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      const subjectTags = wrapper.find(ConnectedSubjectTag);
      expect(subjectTags.length).toEqual(expectRendered);

      for (let i = 0; i < expectRendered; i++) {
        expect(subjectTags.at(i).prop('id')).toEqual(subjects[i]);
      }
    });
  });
});

describe('subject tags when not present', () => {
  const testData: CollectionCardRenderTestData<number> = [
    { mode: 'details' },
    { mode: 'card' },
    { mode: 'tiny-card' },
  ];

  testData.map(({ mode }) => {
    it(`does not render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample();
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      const subjectTags = wrapper.find(ConnectedSubjectTag);
      expect(subjectTags).not.toExist();
    });
  });
});

describe('age range when present', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details', expectRendered: true },
    { mode: 'card', expectRendered: true },
    { mode: 'tiny-card', expectRendered: true },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does ${expectRendered ? '' : 'not '}render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample({
        ageRange: new AgeRange(3, 9),
      });
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode="tiny-card" />,
      );

      if (expectRendered) {
        expect(wrapper.find(AgeRangeTag)).toExist();
        expect(wrapper.find(AgeRangeTag).props().ageRange).toEqual('3-9');
      } else {
        expect(wrapper.find(AgeRangeTag)).not.toExist();
      }
    });
  });
});

describe('age range when not present', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details' },
    { mode: 'card' },
    { mode: 'tiny-card' },
  ];

  testData.map(({ mode }) => {
    it(`does not render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample();
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      expect(wrapper.find(AgeRangeTag)).not.toExist();
    });
  });
});

describe('tags container when no subject or age tags are present', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details', expectRendered: false },
    { mode: 'card', expectRendered: false },
    { mode: 'tiny-card', expectRendered: true },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does ${expectRendered ? '' : 'not '}render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample({
        ageRange: null,
        subjects: [],
      });
      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      if (expectRendered) {
        expect(wrapper.find('.tags-container')).toExist();
      } else {
        expect(wrapper.find('.tags-container')).not.toExist();
      }
    });
  });
});

describe('description', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details', expectRendered: true },
    { mode: 'card', expectRendered: true },
    { mode: 'tiny-card', expectRendered: false },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does ${expectRendered ? '' : 'not '}render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample({
        description: 'My awesome description for the collection',
      });

      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      const description = wrapper.find('[data-qa="collection-description"]');

      if (expectRendered) {
        expect(description).toExist();
        expect(description.prop('children')).toEqual(collection.description);
      } else {
        expect(description).not.toExist();
      }
    });
  });
});

describe('lesson plan when one exists', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details', expectRendered: true },
    { mode: 'card', expectRendered: false },
    { mode: 'tiny-card', expectRendered: false },
  ];

  testData.map(({ mode, expectRendered }) => {
    it(`does ${expectRendered ? '' : 'not '}render in ${mode}`, () => {
      const lessonPlanAttachment = AttachmentFactory.sample();
      const otherAttachment = AttachmentFactory.sample({
        type: 'NOT_A_LESSON_PLAN',
      } as any);
      const collection = VideoCollectionFactory.sample({
        attachments: [otherAttachment, lessonPlanAttachment],
      });

      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      const lessonPlan = wrapper.find(LessonPlan);

      if (expectRendered) {
        expect(lessonPlan).toExist();
        expect(lessonPlan.prop('attachment')).toEqual(lessonPlanAttachment);
        expect(lessonPlan.prop('collectionId')).toEqual(collection.id);
      } else {
        expect(lessonPlan).not.toExist();
      }
    });
  });
});

describe('lesson plan when one does not exist', () => {
  const testData: CollectionCardRenderTestData = [
    { mode: 'details' },
    { mode: 'card' },
  ];

  testData.map(({ mode }) => {
    it(`does not render in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample();

      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      expect(wrapper.find(LessonPlan)).not.toExist();
    });

    it(`the description column to not be restrained in ${mode}`, () => {
      const collection = VideoCollectionFactory.sample();

      const wrapper = shallow(
        <CollectionHeader collection={collection} mode={mode} />,
      );

      const descriptionRow = wrapper.find(
        '.collection-header__description-row',
      );
      expect(descriptionRow).toExist();

      const descriptionColumn = descriptionRow.childAt(0);
      expect(descriptionColumn).toExist();
      expect(descriptionColumn.prop('sm')).toBeFalsy();
      expect(descriptionColumn.prop('md')).toBeFalsy();
      expect(descriptionColumn.prop('lg')).toBeFalsy();
    });
  });
});
