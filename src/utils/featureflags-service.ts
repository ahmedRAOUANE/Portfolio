const env = process.env.NEXT_PUBLIC_ENV!;

const enabled = env === "development" || env === "preview";
const experimentalFeatures = [
    {
        name: "auth",
        enabled
    }
]

export const isFeatureEnabled = (feature: string) =>
    experimentalFeatures.find(f => f.name === feature)?.enabled; 