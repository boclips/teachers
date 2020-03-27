import React from 'react';
import { MockStoreFactory, RouterFactory } from 'test-support/factories';
import { renderWithStore } from 'test-support/renderWithStore';
import { withAppliedSearchParameters } from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';

const getProps = (query: string) => {
  const store = MockStoreFactory.sampleState({
    router: RouterFactory.sample({
      location: { pathname: '', search: query, hash: '', state: null },
    }),
  });
  const spyComponent = jest.fn().mockReturnValue(<div />);

  const DummyComponent = withAppliedSearchParameters(spyComponent);

  renderWithStore(<DummyComponent />, { initialState: store });

  return spyComponent.mock.calls[0][0];
};

describe('query text', () => {
  it('provides the query text', () => {
    const props = getProps(`?q=hi`);

    expect(props.query).toEqual('hi');
    expect(props.numberOfFiltersApplied).toEqual(0);
    expect(props.duration).toEqual(null);
    expect(props.subjectIds).toEqual([]);
  });
});

describe('duration filters', () => {
  it('provides duration with normal range', () => {
    const props = getProps(`?q=hi&duration=60-180`);

    expect(props.query).toEqual('hi');
    expect(props.duration[0].serialise()).toEqual('60-180');
    expect(props.subjectIds).toEqual([]);
    expect(props.numberOfFiltersApplied).toEqual(1);
  });

  it('provides valid duration with no max', () => {
    const props = getProps(`?q=hi&duration=180`);
    expect(props.query).toEqual('hi');
    expect(props.duration[0].serialise()).toEqual('180');
    expect(props.subjectIds).toEqual([]);
    expect(props.numberOfFiltersApplied).toEqual(1);
  });

  it('provides valid duration with no min', () => {
    const props = getProps(`?q=hi&duration=0-180`);
    expect(props.query).toEqual('hi');
    expect(props.duration[0].serialise()).toEqual('0-180');
    expect(props.subjectIds).toEqual([]);
    expect(props.numberOfFiltersApplied).toEqual(1);
  });
});

describe('age range filters', () => {
  it('provides age range with both values', () => {
    const props = getProps(
      `?q=hi&age_range_min=5&age_range_max=11&age_range=5-11`,
    );

    expect(props.query).toEqual('hi');
    expect(props.duration).toEqual(null);
    expect(props.subjectIds).toEqual([]);
    expect(props.ageRange[0].getLabel()).toEqual('5 - 11');
    expect(props.numberOfFiltersApplied).toEqual(1);
  });

  it('provides valid age range with no max', () => {
    const props = getProps(`?q=hi&age_range_min=5&age_range=5+`);

    expect(props.query).toEqual('hi');
    expect(props.duration).toEqual(null);
    expect(props.subjectIds).toEqual([]);
    expect(props.ageRange[0].getLabel()).toEqual('5+');
    expect(props.ageRange[0].getId()).toEqual('5-99');
    expect(props.numberOfFiltersApplied).toEqual(1);
  });
});

describe('subject filters', () => {
  it('provides single subject filter', () => {
    const props = getProps(`?q=hi&subject=subject-one-id`);

    expect(props.query).toEqual('hi');
    expect(props.duration).toEqual(null);
    expect(props.subjectIds).toEqual(['subject-one-id']);
    expect(props.numberOfFiltersApplied).toEqual(1);
  });

  it('provides multiple subject filter', () => {
    const props = getProps(`?q=hi&subject=subject-one-id,subject-two-id`);

    expect(props.query).toEqual('hi');
    expect(props.duration).toEqual(null);
    expect(props.subjectIds).toEqual(['subject-one-id', 'subject-two-id']);
    expect(props.numberOfFiltersApplied).toEqual(2);
  });
});

describe('number of filters applied', () => {
  it('calculates correctly for multiple filters', () => {
    const props = getProps(
      `?q=hi&age_range_min=5&age_range_max=11&age_range=5-11&duration=60-180`,
    );
    expect(props.query).toEqual('hi');
    expect(props.duration[0].serialise()).toEqual('60-180');
    expect(props.subjectIds).toEqual([]);
    expect(props.ageRange[0].getLabel()).toEqual('5 - 11');
    expect(props.numberOfFiltersApplied).toEqual(2);
  });
});
