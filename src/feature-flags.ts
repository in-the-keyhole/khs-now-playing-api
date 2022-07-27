const defaultPort = 4000;

interface FeatureFlags {
    credits: {
        enabled: boolean
    },
}

export const featureFlags: FeatureFlags = {
    credits: {
        enabled: process.env.CREDITS_ON === 'true' || false
    },
};