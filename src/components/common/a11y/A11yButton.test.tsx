import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { noOp } from '../../../utils';
import { A11yButton, Props } from './A11yButton';

const getComponent = (props?: Partial<Props>): ReactWrapper => {
  props = {
    children: <hr />,
    callback: noOp,
    ...props,
  };
  return mount(<A11yButton {...(props as Props)} />);
};

it('Should only render child component directly', () => {
  const component = getComponent({
    children: <div className="testing">Hello</div>,
  });

  const domNode = component.getDOMNode();
  expect(domNode.tagName).toEqual('DIV');
  expect(domNode.className).toEqual('testing');
});

it('Should add an onKeyDown function to the rendered element', () => {
  const component = getComponent();

  expect(component.childAt(0).prop('onKeyDown')).toBeTruthy();
});

it('Should add an callback function to the rendered element', () => {
  const component = getComponent();

  expect(component.childAt(0).prop('onClick')).toBeTruthy();
});

it('Should call the provided callback function when the element receives a click', () => {
  const spy = jest.fn();

  const component = getComponent({ callback: spy });
  const element = component.childAt(0);

  element.simulate('click');

  expect(spy.mock.calls).toHaveLength(1);
});

it('Should not call the provided callback function if disabled when the element receives a click', () => {
  const spy = jest.fn();

  const component = getComponent({ callback: spy, disableClick: true });
  const element = component.childAt(0);

  element.simulate('click');

  expect(spy.mock.calls).toHaveLength(0);
});

it('Should call the provided callback function when the element receives a space key press', () => {
  const spy = jest.fn();

  const component = getComponent({ callback: spy });
  const element = component.childAt(0);

  element.simulate('keydown', { key: ' ' });

  expect(spy.mock.calls).toHaveLength(1);
});

it('Should call the provided callback function when the element receives an enter key press', () => {
  const spy = jest.fn();

  const component = getComponent({ callback: spy });
  const element = component.childAt(0);

  element.simulate('keydown', { key: 'Enter' });

  expect(spy.mock.calls).toHaveLength(1);
});

it('Should call the elements own callback function, as well as the callback function passed in', () => {
  const parentSpy = jest.fn();
  const childSpy = jest.fn();

  const component = getComponent({
    callback: parentSpy,
    children: <hr onClick={childSpy} />,
  });

  const element = component.childAt(0);

  element.simulate('click');

  expect(parentSpy.mock.calls).toHaveLength(1);
  expect(childSpy.mock.calls).toHaveLength(1);
});
