import { notification } from 'antd';
import React from 'react';
import tickIcon from '../../../resources/images/green-check.png';

export interface NotificationOptions {
  message: React.ReactNode;
  description?: React.ReactNode;
}

export default class NotificationFactory {
  public static success(options: NotificationOptions) {
    notification.success({
      message: options.message,
      description: (
        <div role="alert" data-qa="success-notification">
          {options.description}
        </div>
      ),
      placement: 'bottomRight',
      icon: <img src={tickIcon} alt="Tick icon" />,
      style: {
        background: '#008F52',
        color: '#FFFFFF',
      },
      duration: 6,
    });
  }

  public static error(options: NotificationOptions) {
    notification.error({
      message: options.message,
      description: (
        <div role="alert" data-qa="error-notification">
          {options.description}
        </div>
      ),
      placement: 'bottomRight',
      duration: 6,
      style: {
        background: '	#db0000',
        color: '#FFFFFF',
      },
    });
  }
}
