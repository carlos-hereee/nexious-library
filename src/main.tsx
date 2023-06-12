export * from "./atoms/index.js";
export * from "./math/index.js";
export * from "./molecules/index.js";

import "./stylesheets/index.css";
import "./stylesheets/index.scss";

// const main = () => {};
/**
 * // package.json
 * 
    // "compile": "tsc && tsc --module CommonJS --outDir dist/cjs",
 * 
 *   "exports": {
    ".": {
      "import": {
        "types": "./dist/esm/main.d.ts",
        "default": "./dist/esm/main.js"
      },
      "require": {
        "types": "./dist/cjs/main.d.cts",
        "default": "./dist/cjs/main.cts"
      }
    },
    "./atoms": {
      "import": {
        "types": "./dist/esm/atoms/index.d.ts",
        "default": "./dist/esm/atoms/index.js"
      },
      "require": {
        "types": "./dist/cjs/atoms/index.d.ts",
        "default": "./dist/cjs/atoms/index.js"
      }
    },
    "./molecules": {
      "import": {
        "types": "./dist/esm/molecules/index.d.ts",
        "default": "./dist/esm/molecules/index.js"
      },
      "require": {
        "types": "./dist/cjs/molecules/index.d.ts",
        "default": "./dist/cjs/molecules/index.js"
      }
    },
    "./index.css": {
      "import": "./dist/esm/stylesheets/index.css",
      "require": null
    }
  },

 */
