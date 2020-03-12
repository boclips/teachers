import NotificationFactory from '../../common/NotificationFactory';

export const handleUserExists = () => {
  NotificationFactory.error({
    message: 'This email is already registered',
    description: 'If you forgot your password, try to reset it instead.',
  });
};

export const handleError = () => {
  NotificationFactory.error({
    message: 'Ooops! Something went wrong...',
    description: 'Please try again or contact our support team.',
  });
};
