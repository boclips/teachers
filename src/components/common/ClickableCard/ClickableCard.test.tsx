import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { ClickableCard, ClickableCardForRouter, Props } from './ClickableCard';

describe('ClickableCard', () => {
  const getWrapper = (extraProps: Partial<Props> = {}) => {
    const props = {
      ...extraProps,
    } as any;

    return mount(
      // eslint-disable-next-line
      <ClickableCardForRouter {...props}>
        <span>
          Hello world. <a href="/testing">Click me!</a>
        </span>
      </ClickableCardForRouter>,
    );
  };

  it('should render a card, passing props down, but not href', () => {
    const card = mount(
      <Router history={createMemoryHistory()}>
        <ClickableCard href="hi" data-qa="my-card-qa" className="my-card-class">
          <span>Hello world</span>
        </ClickableCard>
      </Router>,
    );

    const cardElement = card.childAt(0).getDOMNode();

    expect(cardElement.getAttribute('data-qa')).toEqual('my-card-qa');
    expect(cardElement.getAttribute('class')).toContain('my-card-class');

    expect(cardElement.getAttribute('href')).toBeNull();

    const spanElement = card.find('span');

    expect(spanElement).toExist();
    expect(spanElement.text()).toEqual('Hello world');
  });

  it('should navigate to the href on click', () => {
    const pushSpy = jest.fn();
    const wrapper = getWrapper({
      href: 'my-href',
      history: { push: pushSpy } as any,
    });

    wrapper.simulate('click', {});

    expect(pushSpy).toHaveBeenCalledWith('my-href');
  });

  it('should open the href in a new window when control clicked', () => {
    const pushSpy = jest.fn();
    const wrapper = getWrapper({
      href: 'my-href',
      history: { push: pushSpy } as any,
    });

    wrapper.simulate('click', { ctrlKey: true });

    expect(window.open).toHaveBeenCalledWith('my-href');
  });

  it('should open the href in a new window when command clicked', () => {
    const wrapper = getWrapper({ href: 'my-href' });

    wrapper.simulate('click', { metaKey: true });

    expect(window.open).toHaveBeenCalledWith('my-href');
  });
});
