export const defaultAuthEndpoint =
  process.env.ENVIRONMENT_DOMAIN &&
  `https://login.${process.env.ENVIRONMENT_DOMAIN}/auth`;
