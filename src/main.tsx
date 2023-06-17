export * from "./atoms";
export * from "./math";
export * from "./molecules";

import "./stylesheets/index.scss";

// import { add } from "./math";
// const main = () => {
//   console.log("add");
//   console.log(add(1, 5));
// };
// main();
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
        "default": "./dist/esm/atoms/index.tsx"
      },
      "require": {
        "types": "./dist/cjs/atoms/index.d.ts",
        "default": "./dist/cjs/atoms/index.tsx"
      }
    },
    "./molecules": {
      "import": {
        "types": "./dist/esm/molecules/index.d.ts",
        "default": "./dist/esm/molecules/index.tsx"
      },
      "require": {
        "types": "./dist/cjs/molecules/index.d.ts",
        "default": "./dist/cjs/molecules/index.tsx"
      }
    },
    "./index.css": {
      "import": "./dist/esm/stylesheets/index.css",
      "require": null
    }
  },

 */
