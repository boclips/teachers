import { UserProfile } from './MixpanelAnalytics';

export default interface Analytics {
  publish(event: EventTypes): void;
  setUserId(userId: string): void;
  createUserProfile(userProfile: UserProfile): void;
}

export enum EventTypes {
  ACTIVATION_COMPLETE = 'ACTIVATION_COMPLETE',
}
