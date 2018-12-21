export default interface Analytics {
  publish(event: EventTypes): void;
  setUserId(userId: string): void;
}

export enum EventTypes {
  ACTIVATION_COMPLETE = 'ACTIVATION_COMPLETE',
}
