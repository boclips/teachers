import { mount } from 'enzyme';
import React from 'react';
import StopClickPropagation from './StopClickPropagation';

describe('StopClickPropagation component', () => {
  const wrapWithStopClickPropagation = (
    children,
    onClick,
    onMouseDown = () => {},
  ) =>
    mount(
      // eslint-disable-next-line
      <div onClick={onClick} onMouseDown={onMouseDown}>
        <StopClickPropagation>{children}</StopClickPropagation>
      </div>,
    );

  it('Wraps the child props in a div', () => {
    const wrapper = wrapWithStopClickPropagation(
      <span>Some text</span>,
      () => {},
    );

    const child = wrapper.children();

    expect(child.getDOMNode().tagName).toEqual('DIV');
  });

  it("The div has an onClick listener that stops events propagating upwards to the parent, from it's children", () => {
    const parentOnClick = jest.fn();

    const wrapper = wrapWithStopClickPropagation(
      <span>Some Text</span>,
      parentOnClick,
    );

    const childSpan = wrapper.find('span');

    childSpan.simulate('click');

    expect(parentOnClick.mock.calls).toHaveLength(0);
  });

  it("The div has an onMouseDown listener that stops events propagating upwards to the parent, from it's children", () => {
    const parentOnMouseDown = jest.fn();

    const wrapper = wrapWithStopClickPropagation(
      <span>Some Text</span>,
      jest.fn(),
      parentOnMouseDown,
    );

    const childSpan = wrapper.find('span');

    childSpan.simulate('mousedown');

    expect(parentOnMouseDown.mock.calls).toHaveLength(0);
  });

  it('Can accept multiple children', () => {
    const parentOnClick = jest.fn();

    const wrapper = mount(
      // eslint-disable-next-line
      <div onClick={parentOnClick}>
        <StopClickPropagation>
          <span>Some text</span>
          <div>Some text</div>
          <p>Some text</p>
        </StopClickPropagation>
      </div>,
    );

    const child = wrapper.children();

    child.simulate('click');

    expect(parentOnClick.mock.calls).toHaveLength(0);
  });

  it('Can still call child components onClick handler', () => {
    const childOnClick = jest.fn();
    const wrapper = wrapWithStopClickPropagation(
      // eslint-disable-next-line
      <span onClick={childOnClick}>Some Text</span>,
      () => {},
    );

    const childSpan = wrapper.find('span');

    childSpan.simulate('click');

    expect(childOnClick.mock.calls).toHaveLength(1);
  });

  it('does not prevent default - interferes with checkbox behaviour', () => {
    const wrapper = wrapWithStopClickPropagation(
      <span>Some Text</span>,
      () => {},
    );

    const childSpan = wrapper.find('span');

    const preventDefault = jest.fn();

    childSpan.simulate('click', { preventDefault });

    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('stops propagation', () => {
    const wrapper = wrapWithStopClickPropagation(
      <span>Some Text</span>,
      () => {},
    );

    const childSpan = wrapper.find('span');

    const stopPropagation = jest.fn();

    childSpan.simulate('click', { stopPropagation });

    expect(stopPropagation).toHaveBeenCalled();
  });
});
