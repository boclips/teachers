import RateButton from 'src/components/video/buttons/rate/RateButton';
import { VideoFactory } from 'test-support/factories';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { internalAnalyticsMock } from 'test-support/getAnalyticsMock';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { renderWithStore } from 'test-support/renderWithStore';

jest.mock('src/services/analytics/AnalyticsFactory');

AnalyticsFactory.internalAnalytics = jest.fn(() => internalAnalyticsMock);

describe('RateButton', () => {
  it('emits an event when user clicks on the button', () => {
    const video = VideoFactory.sample();
    const component = renderWithStore(<RateButton video={video} />);

    const rateButton = component.getByText('Rate this video').closest('button');
    fireEvent.click(rateButton);

    expect(
      internalAnalyticsMock.trackRateThisVideoLinkClicked,
    ).toHaveBeenCalledWith(video);
  });
});
