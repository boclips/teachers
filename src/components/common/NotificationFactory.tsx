import { notification } from 'antd';
import React from 'react';
import tickIcon from 'resources/images/green-check.png';

import './NotificationFactory.less';

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
      className: 'notification--success',
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
      className: 'notification--error',
      placement: 'bottomRight',
      duration: 6,
    });
  }
}
