import { mount, shallow } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Router } from 'react-router';
import { ClickableCard, ClickableCardForRouter, Props } from './ClickableCard';

describe('ClickableCard', () => {
  // @ts-ignore
  const getWrapper = (extraProps: Partial<Props> = {}) => {
    const props = {
      ...extraProps,
    } as any;

    return shallow(
      <ClickableCardForRouter {...props}>
        <span>Hello world</span>
      </ClickableCardForRouter>,
    );
  };

  it('should render a card, passing props down, but not destination', () => {
    const card = mount(
      <Router history={createMemoryHistory()}>
        <ClickableCard
          destination={'hi'}
          data-qa={'my-card-qa'}
          className="my-card-class"
        >
          <span>Hello world</span>
        </ClickableCard>
      </Router>,
    );

    const cardElement = card.childAt(0).getDOMNode();

    expect(cardElement.getAttribute('data-qa')).toEqual('my-card-qa');
    expect(cardElement.getAttribute('class')).toContain('my-card-class');

    expect(cardElement.getAttribute('destination')).toBeNull();

    const spanElement = card.find('span');

    expect(spanElement).toExist();
    expect(spanElement.text()).toEqual('Hello world');
  });

  it('should navigate to the destination on click', () => {
    const pushSpy = jest.fn();
    const wrapper = getWrapper({
      destination: 'my-destination',
      history: { push: pushSpy } as any,
    });

    wrapper.simulate('click', {});

    expect(pushSpy).toHaveBeenCalledWith('my-destination');
  });

  it('should open the destination in a new window when control clicked', () => {
    const pushSpy = jest.fn();
    const wrapper = getWrapper({
      destination: 'my-destination',
      history: { push: pushSpy } as any,
    });

    wrapper.simulate('click', { ctrlKey: true });

    expect(window.open).toHaveBeenCalledWith('my-destination');
  });

  it('should open the destination in a new window when command clicked', () => {
    const pushSpy = jest.fn();
    const wrapper = getWrapper({
      destination: 'my-destination',
      history: { push: pushSpy } as any,
    });

    wrapper.simulate('click', { metaKey: true });

    expect(window.open).toHaveBeenCalledWith('my-destination');
  });
});
