import React from 'react';
import { renderWithStore } from '../../../../test-support/renderWithStore';
import ShareModal from './ShareModal';

describe('Share modal', () => {
  it('displays the teacher share code', () => {
    const { getByText } = renderWithStore(
      <ShareModal mobileView={false} video={} handleClose={} visible={true} />,
    );

    expect(getByText('BOB1')).toBeInTheDocument();
  });
});
