export default interface Analytics {
  publish(event: EventTypes): void;
}

export enum EventTypes {
  ACTIVATION_COMPLETE = 'ACTIVATION_COMPLETE',
}
