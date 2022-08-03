interface FeatureFlags {
  credits: {
    enabled: boolean;
  };
}

export const featureFlags: FeatureFlags = {
  credits: {
    enabled: process.env.CREDITS_ENABLED === 'true' || false,
  },
};
