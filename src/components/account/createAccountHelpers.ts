import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import NotificationFactory from '../common/NotificationFactory';

export const handleUserExists = (values: any) => {
  NotificationFactory.error({
    message: 'This email is already registered',
    description: 'If you forgot your password, try to reset it instead.',
  });

  AnalyticsFactory.getInstance().trackAccountAlreadyExists({
    ...values,
    password: 'redacted',
  });
};

export const handleError = (values: any) => {
  NotificationFactory.error({
    message: 'Ooops! Something went wrong...',
    description: 'Please try again or contact our support team.',
  });

  AnalyticsFactory.getInstance().trackAccountAlreadyExists({
    ...values,
    password: 'redacted',
  });
};
