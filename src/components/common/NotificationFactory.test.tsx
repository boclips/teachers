import { notification } from 'antd';
import React from 'react';
import NotificationFactory from './NotificationFactory';

jest.mock('antd');

test('success calls ui notification with correct details', () => {
  NotificationFactory.success({
    message: ' Hello from the otherside',
    description: 'I must have called 1000 times',
  });

  expect(notification.success).toBeCalledWith(
    expect.objectContaining({
      message: ' Hello from the otherside',
      description: (
        <div role="alert" data-qa="success-notification">
          I must have called 1000 times
        </div>
      ),
      placement: 'bottomRight',
    }),
  );
});

test('error calls ui notification with correct details', () => {
  NotificationFactory.error({
    message: 'Now youre somebody that I used to know',
    description: 'SOMEBODY',
  });

  expect(notification.error).toBeCalledWith(
    expect.objectContaining({
      message: 'Now youre somebody that I used to know',
      description: (
        <div role="alert" data-qa="error-notification">
          SOMEBODY
        </div>
      ),
      placement: 'bottomRight',
    }),
  );
});
