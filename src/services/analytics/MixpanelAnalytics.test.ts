import MixpanelAnalytics from './MixpanelAnalytics';

describe('MixpanelAnalytics', () => {
  it('resetting mixpanel generates a new id', () => {
    const mixpanelInstance = MixpanelAnalytics.getInstance();
    const oldId = mixpanelInstance.getCurrentUserId();
    mixpanelInstance.reset();
    const newId = mixpanelInstance.getCurrentUserId();

    expect(newId).not.toEqual(oldId);
  });
});
