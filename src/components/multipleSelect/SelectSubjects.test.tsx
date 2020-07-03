import { SubjectFactory } from 'boclips-api-client/dist/test-support';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectSubjects } from './SelectSubjects';

describe('SelectSubjects', () => {
  test('renders a list of subjects alphabetically ordered', async () => {
    const view = render(
      <SelectSubjects
        label=""
        subjects={[
          SubjectFactory.sample({ id: '1', name: 'Maths' }),
          SubjectFactory.sample({ id: '3', name: 'Art' }),
        ]}
        onChange={jest.fn()}
        placeholder="Select a subject"
        value={[]}
      />,
    );

    const selector = view.getByText('Select a subject');
    fireEvent.mouseDown(selector);

    const maths = await view.findByText('Maths');
    const art = view.getByText('Art');

    expect(maths).toBeInTheDocument();
    expect(art).toBeInTheDocument();

    const options = view.getAllByRole('option');

    expect(options[0].outerHTML).toContain('Art');
    expect(options[1].outerHTML).toContain('Maths');
  });

  test('onSelection returns a list of selected ids', async () => {
    const callback = jest.fn();
    const view = render(
      <SelectSubjects
        label=""
        subjects={[
          SubjectFactory.sample({ id: '1', name: 'Maths' }),
          SubjectFactory.sample({ id: '3', name: 'Art' }),
        ]}
        onChange={callback}
        placeholder="Select a subject"
        value={[]}
      />,
    );

    const selector = view.getByText('Select a subject');
    fireEvent.mouseDown(selector);

    const maths = await view.findByText('Maths');

    expect(maths).toBeInTheDocument();

    fireEvent.click(maths);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(['1']);
  });

  it('renders the preselected value', () => {
    const callback = jest.fn();
    const view = render(
      <SelectSubjects
        label=""
        subjects={[
          SubjectFactory.sample({ id: '1', name: 'Maths' }),
          SubjectFactory.sample({ id: '3', name: 'Art' }),
        ]}
        onChange={callback}
        placeholder="Select a subject"
        value={['3']}
      />,
    );

    const art = view.getByText('Art');

    expect(art).toBeInTheDocument();
  });
});
