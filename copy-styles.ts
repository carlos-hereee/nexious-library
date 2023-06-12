import fs from "node:fs";

fs.copyFile(
  "./src/stylesheets/index.css",
  "./dist/esm/stylesheets/index.css",
  (err) => {
    if (err) {
      console.log("err", err);
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log("stylesheets copied sucessfully");
  }
);
