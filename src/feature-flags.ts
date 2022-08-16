interface FeatureFlags {
  credits: {
    enabled: boolean;
  };
}

const checkFeatureFlag = (featureFlag: string | undefined): boolean => {
  const featureFlagOn = process.env.ALL_FEATURES_ON === 'true'
    ? true
    : featureFlag === 'true' || false
  return featureFlagOn;
}

export const featureFlags: FeatureFlags = {
  credits: {
    enabled: checkFeatureFlag(process.env.CREDITS_ENABLED)
  },
};
