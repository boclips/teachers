import MixpanelAnalytics from './MixpanelAnalytics';

describe('MixpanelAnalytics', () => {
  it('returns testing token for testing env', () => {
    const token = MixpanelAnalytics.selectToken('someting.testing-boclips.com');
    expect(token).toBe(MixpanelAnalytics.testingToken);
  });

  it('returns staging token for staging env', () => {
    const token = MixpanelAnalytics.selectToken('someting.staging-boclips.com');
    expect(token).toBe(MixpanelAnalytics.stagingToken);
  });

  it('returns production token for production env', () => {
    const token = MixpanelAnalytics.selectToken('someting.boclips.com');
    expect(token).toBe(MixpanelAnalytics.productionToken);
  });

  it('returns testing token for other env', () => {
    const token = MixpanelAnalytics.selectToken('localhost');
    expect(token).toBe(MixpanelAnalytics.testingToken);
  });

  it('resetting mixpanel generates a new id', () => {
    const mixpanelInstance = MixpanelAnalytics.getInstance();
    const oldId = mixpanelInstance.getCurrentUserId();
    mixpanelInstance.reset();
    const newId = mixpanelInstance.getCurrentUserId();

    expect(newId).not.toEqual(oldId);
  });
});
