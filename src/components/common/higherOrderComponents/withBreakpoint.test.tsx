import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { mount } from 'enzyme';
import React from 'react';
import { Breakpoint } from '../../../types/MediaBreakpoints';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from './withMediaBreakPoint';

const setWidth = x => {
  // @ts-ignore
  window.innerWidth = x;
  window.dispatchEvent(new Event('resize'));
};

const renderComponent = () => {
  const WithWidthBreakpointComponent = withMediaBreakPoint(props => (
    <Button {...props} />
  ));

  return mount(<WithWidthBreakpointComponent />);
};

describe('breakpoints', () => {
  it('injects correct props to child component when xs width', () => {
    setWidth(479);
    const wrapper = renderComponent();
    expect(
      (wrapper.find(Button).prop('mediaBreakpoint') as Breakpoint).label,
    ).toEqual('xs');
  });

  it('injects correct props to child component when sm width', () => {
    setWidth(575);
    const wrapper = renderComponent();
    expect(
      (wrapper.find(Button).prop('mediaBreakpoint') as Breakpoint).label,
    ).toEqual('sm');
  });

  it('injects correct props to child component when md width', () => {
    setWidth(767);
    const wrapper = renderComponent();
    expect(
      (wrapper.find(Button).prop('mediaBreakpoint') as Breakpoint).label,
    ).toEqual('md');
  });

  it('injects correct props to child component when lg width', () => {
    setWidth(991);
    const wrapper = renderComponent();
    expect(
      (wrapper.find(Button).prop('mediaBreakpoint') as Breakpoint).label,
    ).toEqual('lg');
  });

  it('injects correct props to child component when xl width', () => {
    setWidth(1199);
    const wrapper = renderComponent();
    expect(
      (wrapper.find(Button).prop('mediaBreakpoint') as Breakpoint).label,
    ).toEqual('xl');
  });

  it('injects correct props to child component when xl width', () => {
    setWidth(1599);
    const wrapper = renderComponent();
    expect(
      (wrapper.find(Button).prop('mediaBreakpoint') as Breakpoint).label,
    ).toEqual('xxl');
  });
});

describe(`on resize`, () => {
  it('injects correct props to child component when window is resized', () => {
    setWidth(300);
    const wrapper = renderComponent();

    setWidth(990);
    wrapper.update();

    expect(
      (wrapper.find(Button).prop('mediaBreakpoint') as Breakpoint).label,
    ).toEqual('lg');
  });
});

it('renders child component with correct props', () => {
  setWidth(400);

  const WithWidthBreakpointComponent = withMediaBreakPoint(
    (props: ButtonProps & WithMediaBreakPointProps) => <Button {...props} />,
  );

  const wrapper = mount(<WithWidthBreakpointComponent size="large" />);

  expect(wrapper.find(Button).prop('size')).toEqual('large');
});
