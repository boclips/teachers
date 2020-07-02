import { mount } from 'enzyme';
import React from 'react';
import { useMediaBreakPoint } from './useMediaBreakPoint';

const setWidth = (width) => {
  // @ts-ignore
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

const renderComponent = () => {
  const WithWidthBreakpointComponent = () => {
    const breakpoint = useMediaBreakPoint();

    return (
      <div
        data-breakpoint-label={breakpoint.label}
        data-breakpoint-width={breakpoint.width}
      />
    );
  };

  return mount(<WithWidthBreakpointComponent />);
};

describe('breakpoints', () => {
  it('returns the correct label', () => {
    setWidth(479);
    const wrapper = renderComponent();
    expect(wrapper.find('div').prop('data-breakpoint-label')).toEqual('xs');
    expect(wrapper.find('div').prop('data-breakpoint-width')).toEqual(480);
  });

  it('injects correct props to child component when sm width', () => {
    setWidth(575);
    const wrapper = renderComponent();
    expect(wrapper.find('div').prop('data-breakpoint-label')).toEqual('sm');
    expect(wrapper.find('div').prop('data-breakpoint-width')).toEqual(576);
  });

  it('injects correct props to child component when md width', () => {
    setWidth(767);
    const wrapper = renderComponent();
    expect(wrapper.find('div').prop('data-breakpoint-label')).toEqual('md');
    expect(wrapper.find('div').prop('data-breakpoint-width')).toEqual(768);
  });

  it('injects correct props to child component when lg width', () => {
    setWidth(991);
    const wrapper = renderComponent();
    expect(wrapper.find('div').prop('data-breakpoint-label')).toEqual('lg');
    expect(wrapper.find('div').prop('data-breakpoint-width')).toEqual(992);
  });

  it('injects correct props to child component when xl width', () => {
    setWidth(1199);
    const wrapper = renderComponent();
    expect(wrapper.find('div').prop('data-breakpoint-label')).toEqual('xl');
    expect(wrapper.find('div').prop('data-breakpoint-width')).toEqual(1200);
  });

  it('injects correct props to child component when xl width', () => {
    setWidth(1599);
    const wrapper = renderComponent();
    expect(wrapper.find('div').prop('data-breakpoint-label')).toEqual('xxl');
    expect(wrapper.find('div').prop('data-breakpoint-width')).toEqual(1600);
  });
});

describe(`on resize`, () => {
  it('injects correct props to child component when window is resized', () => {
    setWidth(300);
    const wrapper = renderComponent();

    setWidth(990);
    wrapper.update();

    expect(wrapper.find('div').prop('data-breakpoint-label')).toEqual('lg');
    expect(wrapper.find('div').prop('data-breakpoint-width')).toEqual(992);
  });
});
