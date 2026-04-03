import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(viteConfig) {
    // Mirror the path aliases from tsconfig.json so Storybook's Vite bundler
    // can resolve @nxs-atoms, @nxs-molecules, etc. — without this, imports
    // like "@nxs-atoms/buttons/Button" would fail at Storybook build time.
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...((viteConfig.resolve.alias as Record<string, string>) ?? {}),
      "@nxs-atoms": path.resolve(__dirname, "../src/components/atoms"),
      "@nxs-molecules": path.resolve(__dirname, "../src/components/molecules"),
      "@nxs-organism": path.resolve(__dirname, "../src/components/organism"),
      "@nxs-template": path.resolve(__dirname, "../src/components/template"),
      "@nxs-utils": path.resolve(__dirname, "../src/utils"),
      "@nxs-math": path.resolve(__dirname, "../src/math"),
      "@nxs-helpers": path.resolve(__dirname, "../src/utils/helpers"),
    };
    return viteConfig;
  },
};

export default config;
