import { AgeRange } from "../../../../types/AgeRange";
import { MockStoreFactory, RouterFactory } from "../../../../../test-support/factories";
import React from "react";
import { shallow } from "enzyme";
import AgeRangeFilterTag from "./AgeRangeFilterTag";
import { ClosableTag } from "../../../video/tags/Tag";
import { updateSearchParamsAction } from "../../redux/actions/updateSearchParametersActions";

const getWrapper = (ageRange?: AgeRange) => {
    const store = MockStoreFactory.sample();

    return shallow(
        <AgeRangeFilterTag ageRange={ageRange} />,
        { context: { store } },
    ).dive();
};

it('renders age range with normal range', () => {
    const wrapper = getWrapper(new AgeRange({ min: 5, max: 11 }));
    expect(wrapper.find(ClosableTag).props().value).toEqual('5 - 11');
});

it('renders age range with no max', () => {
    const wrapper = getWrapper(new AgeRange({ min: 5 }));
    expect(wrapper.find(ClosableTag).props().value).toEqual('5 +');
});

// Not sure what to do about this?
it('renders age range with no min', () => {
    const wrapper = getWrapper(new AgeRange({ min: null, max: 7 }));
    expect(wrapper.find(ClosableTag).props().value).toEqual('3 - 7');
});

it('does not render anything if no age range', () => {
    const wrapper = getWrapper();
    expect(wrapper).toBeEmptyRender();
});

it('removes age range from url on close', () => {
    const store = MockStoreFactory.sample({
        router: RouterFactory.sample({
            location: {
                pathname: '',
                search: '?hi&age_range_min=5',
                hash: '',
                state: null,
            },
        }),
    });

    const wrapper = shallow(<AgeRangeFilterTag ageRange={new AgeRange({ min: 5 })} />, {
        context: { store },
    }).dive();

    wrapper
        .find(ClosableTag)
        .props()
        .onClose();

    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()).toContainEqual(
        updateSearchParamsAction({
            age_range_min: undefined,
            age_range_max: undefined,
        }),
    );
});