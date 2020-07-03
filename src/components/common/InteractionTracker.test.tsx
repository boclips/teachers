import { InteractionTracker } from 'src/components/common/InteractionTracker';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('InteractionTracker', () => {
  it('can track left click', () => {
    const spyOnInteraction = jest.fn();
    const view = renderView(spyOnInteraction);

    fireEvent.click(view.getByText('Link'), { button: 0 });

    expect(spyOnInteraction.mock.calls.length).toEqual(1);
  });

  it('can track middle button / scroller click', () => {
    const spyOnInteraction = jest.fn();
    const view = renderView(spyOnInteraction);

    fireEvent.mouseDown(view.getByText('Link'), { button: 1 });

    expect(spyOnInteraction.mock.calls.length).toEqual(1);
  });

  it('can track right click', () => {
    const spyOnInteraction = jest.fn();
    const view = renderView(spyOnInteraction);

    fireEvent.mouseDown(view.getByText('Link'), { button: 2 });

    expect(spyOnInteraction.mock.calls.length).toEqual(1);
  });

  const renderView = (spy: () => void) =>
    render(
      <InteractionTracker onInteraction={spy}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Link</a>
      </InteractionTracker>,
    );
});
