export interface RegistrationContext {
  referralCode: string;
  utm: {
    source: string;
    term: string;
    medium: string;
    campaign: string;
    content: string;
  };
}
