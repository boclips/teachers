import axios from 'axios';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { VideoFactory } from '../../../../test-support/factories';
import { ShareCodeDialog } from './ShareCodeDialog';

const video = VideoFactory.sample();

it(`disables the watch video button while no shareCode is provided`, async () => {
  const wrapper = render(<ShareCodeDialog video={video} />);
  const button = wrapper.getByText('Watch video');
  const shareField = wrapper.getByRole('textbox');

  expect(button).toBeInTheDocument();
  expect(shareField).toBeInTheDocument();
  await fireEvent.click(button);

  expect(wrapper.getByText('Watch video')).toBeInTheDocument();
});

describe('share code validation', () => {
  beforeEach(() => {
    const axiosMock = new MockAdapter(axios);
    axiosMock
      .onGet(
        video.links.validateShareCode.getTemplatedLink({ shareCode: 'abc' }),
      )
      .reply(200);
    axiosMock.onGet().reply(401);
  });

  const testData = [
    {
      message: 'closes the share modal when share code is valid',
      shareCode: 'abc',
      expectToClose: true,
    },
    {
      message: 'does not close the share modal when share code is invalid',
      shareCode: 'foo',
      expectToClose: false,
    },
  ];

  testData.forEach(({ message, shareCode, expectToClose }) => {
    it(message, async () => {
      const wrapper = render(<ShareCodeDialog video={video} />);
      const button = wrapper.getByText('Watch video');
      const shareField = wrapper.getByPlaceholderText('Enter code');
      expect(button).toBeInTheDocument();
      expect(shareField).toBeInTheDocument();

      await fireEvent.change(shareField, { target: { value: shareCode } });
      await fireEvent.click(button);

      if (expectToClose) {
        await expect(
          waitForElementToBeRemoved(() => wrapper.getByText('Watch video')),
        ).resolves.toEqual(true);
      } else {
        expect(
          waitForElementToBeRemoved(() => wrapper.getByText('Watch video')),
        ).rejects.toThrow();
      }
    });
  });
});
