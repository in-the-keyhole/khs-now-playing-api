interface FeatureFlags {
  credits: {
    enabled: boolean;
  };
}

const checkFeatureFlag = (featureFlag: string | undefined): boolean => {
  console.log(process.env.ALL_FEATURES_ON);
  const featureFlagOn = process.env.ALL_FEATURES_ON === 'true'
    ? true
    : featureFlag === 'true' || false
  console.log(`Feature Flag: %s`, featureFlagOn);
  return featureFlagOn;
}

export const featureFlags: FeatureFlags = {
  credits: {
    enabled: checkFeatureFlag(process.env.CREDITS_ENABLED)
  },
};
