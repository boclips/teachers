import { RoleForm } from 'src/components/account/form/RoleForm';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

describe('RoleForm', () => {
  it('renders available roles', async () => {
    const view = render(<RoleForm formItemId="test" />);
    fireEvent.mouseDown(view.getByLabelText("I'm a"));
    expect(view.getByText('Teacher')).toBeInTheDocument();
    expect(view.getByText('Parent')).toBeInTheDocument();
    expect(view.getByText('School admin')).toBeInTheDocument();
    expect(view.getByText('Other')).toBeInTheDocument();
  });
});
