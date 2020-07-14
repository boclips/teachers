import { fireEvent } from '@testing-library/react';
import React, { Ref } from 'react';
import { SliderSingleProps } from 'antd/lib/slider';
import { SelectProps } from 'antd/lib/select';
import {
  MockStoreFactory,
  SubjectsFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from 'test-support/factories';
import { AgeRange } from 'src/types/AgeRange';
import { Link } from 'src/types/Link';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import MockFetchVerify, { axiosMock } from 'test-support/MockFetchVerify';
import { VideoCollection } from 'src/types/VideoCollection';
import eventually from 'test-support/eventually';
import { EditCollectionForm } from './EditCollectionForm';

jest.mock('antd/lib/slider', () =>
  React.forwardRef((props: SliderSingleProps, ref: Ref<any>) => (
    <input
      ref={ref}
      /* eslint-disable-next-line */
      role="slider"
      onChange={(event) => {
        props.onChange(JSON.parse(event.target.value));
      }}
      data-value-json={JSON.stringify(props.value)}
      value={props.value as any}
      data-default-value-json={JSON.stringify(props.defaultValue)}
      data-qa="slider"
    />
  )),
);

jest.mock('antd/lib/select', () => {
  const Select = React.forwardRef((props: SelectProps<any>, ref: Ref<any>) => (
    <input
      ref={ref}
      type="text"
      /* eslint-disable-next-line */
      role="select"
      onChange={(event) => {
        props.onChange(JSON.parse(event.target.value), null);
      }}
      data-value-json={JSON.stringify(props.value)}
      value={props.value as any}
      data-default-value-json={JSON.stringify(props.defaultValue)}
      data-qa="select"
    />
  ));
  // @ts-ignore
  Select.Option = () => <span>test</span>;
  return Select;
});

describe('EditCollectionForm', () => {
  beforeEach(() => {
    MockFetchVerify.patch('/collections/123', undefined, 204);
  });

  const getCollection = (args: Partial<VideoCollection> = {}) =>
    VideoCollectionFactory.sample({
      id: '123',
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/collections/123' }),
        remove: new Link({ href: '/collections/123' }),
      }),
      ...args,
    });

  const renderEditForm = (collection: VideoCollection) =>
    renderWithBoclipsStore(
      <EditCollectionForm
        setVisible={jest.fn()}
        visible
        disableButton={false}
        collection={collection}
      />,
      MockStoreFactory.sampleState({
        subjects: SubjectsFactory.sample(),
      }),
    );

  it('has the values of the collection in the form', async () => {
    const collection = VideoCollectionFactory.sample({
      title: 'My test collection',
      description: 'Test description',
      subjects: ['maths', 'arts'],
      ageRange: new AgeRange(5, 14),
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/collections/123' }),
      }),
    });

    const component = renderEditForm(collection);

    expect(component.getByText('Edit collection')).toBeVisible();

    const getInputByTestId = (testId) =>
      component.getByTestId(testId) as HTMLInputElement;

    expect(getInputByTestId('title-edit').value).toEqual('My test collection');
    expect(getInputByTestId('description-edit').value).toEqual(
      'Test description',
    );

    const selectBoxes = component.getAllByTestId(
      'select',
    ) as HTMLInputElement[];

    expect(selectBoxes[0].value).toContain(5);
    expect(selectBoxes[1].value).toContain(14);
    expect(selectBoxes[2].value).toContain('maths,arts');
  });

  describe('Submitting the form', () => {
    it('updates the title', async () => {
      const collection = getCollection({
        title: 'Old Title',
      });

      const component = renderEditForm(collection);

      fireEvent.change(component.getByDisplayValue('Old Title'), {
        target: { value: 'New Title' },
      });

      await fireEvent.click(component.getByText('Save'));

      await eventually(() => {
        const updatedCollection = component.store.getState().entities
          .collections.byId[collection.id];
        expect(updatedCollection).toBeDefined();
        expect(updatedCollection.title).toEqual('New Title');
      });
    });

    it('changing the subjects of a collection fires a patch action', async () => {
      const collection = getCollection({
        subjects: [],
      });

      const component = renderEditForm(collection);

      fireEvent.change(component.getAllByTestId('select')[2], {
        target: { value: JSON.stringify(['subject-one-id', 'subject-two-id']) },
      });

      await fireEvent.click(component.getByText('Save'));

      await eventually(() => {
        const updatedCollection = component.store.getState().entities
          .collections.byId[collection.id];
        expect(updatedCollection).toBeDefined();
        expect(updatedCollection.subjects).toEqual([
          'subject-one-id',
          'subject-two-id',
        ]);
      });
    });

    it('updates the description', async () => {
      const collection = getCollection({
        description: 'Old Description',
      });

      const component = renderEditForm(collection);

      fireEvent.change(component.getByText('Old Description'), {
        target: { value: 'New Description' },
      });

      await fireEvent.click(component.getByText('Save'));

      await eventually(() => {
        const updatedCollection = component.store.getState().entities
          .collections.byId[collection.id];
        expect(updatedCollection).toBeDefined();
        expect(updatedCollection.description).toEqual('New Description');
      });
    });

    describe('updating the age range', () => {
      const testData = [
        {
          message: 'is an interval',
          initialAgeRange: new AgeRange(3, 9),
          newAgeRange: { min: 6, max: 7 },
        },
        {
          message: 'increased to max',
          initialAgeRange: new AgeRange(11, 16),
          newAgeRange: { min: 11, max: 19 },
        },
        {
          message: 'was unbounded',
          initialAgeRange: new AgeRange(),
          newAgeRange: { min: 11, max: 16 },
        },
      ];

      testData.forEach(({ message, initialAgeRange, newAgeRange }) => {
        it(`updates when age range ${message}`, async () => {
          const collection = getCollection({
            ageRange: initialAgeRange,
          });
          const component = renderEditForm(collection);

          fireEvent.change(component.getAllByTestId('select')[0], {
            target: {
              value: JSON.stringify(newAgeRange.min),
            },
          });
          fireEvent.change(component.getAllByTestId('select')[1], {
            target: {
              value: JSON.stringify(newAgeRange.max),
            },
          });

          await fireEvent.click(component.getByText('Save'));

          await eventually(() => {
            const updatedCollection = component.store.getState().entities
              .collections.byId[collection.id];
            expect(updatedCollection).toBeDefined();
            expect(updatedCollection.ageRange.resolveMin()).toEqual(
              newAgeRange.min,
            );
            expect(updatedCollection.ageRange.resolveMax()).toEqual(
              newAgeRange.max,
            );
          });
        });
      });
    });

    it('does not update a collection without any changes', async () => {
      const collection = getCollection({});
      const component = renderEditForm(collection);

      await fireEvent.click(component.getByText('Save'));

      expect(axiosMock.history.patch).toHaveLength(0);
    });
  });

  describe('Removing the collection', () => {
    it('renders a remove button', () => {
      const collection = getCollection();

      const component = renderEditForm(collection);

      expect(component.getByText('Delete Collection')).toBeInTheDocument();
    });
    it('opens a modal when clicking on remove button', async () => {
      const collection = getCollection();

      const component = renderEditForm(collection);

      fireEvent.click(component.getByText('Delete Collection'));

      expect(await component.findByText(/are you sure/i)).toBeInTheDocument();
    });
  });
});
