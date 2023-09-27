import fs from "fs";
import path from "path";

const sourceFolder = "./src/@types";
const targetFolder = "./dist/esm/@types";

// Create the target folder if it doesn't exist
if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder);
}

// Function to copy a file from source to target folder if it doesn't already exist
function copyFileIfNotExists(filename) {
  const sourceFilePath = path.join(sourceFolder, filename);
  const targetFilePath = path.join(targetFolder, filename);

  if (!fs.existsSync(targetFilePath)) {
    // Copy the file to the target folder
    fs.copyFileSync(sourceFilePath, targetFilePath);
    console.log(`Copied: ${sourceFilePath} to ${targetFilePath}`);
  }
}

fs.watch(sourceFolder, (eventType, filename) => {
  if ((eventType = "rename" || eventType === "change")) {
    console.log(`File ${filename} has changed. Executing `);
    copyFileIfNotExists(filename);
  } else if (eventType === "unlink") {
    // handle file deletion
    const targetFilePath = path.join(targetFolder, filename);
    // remove file
    fs.unlinkSync(targetFilePath);
    console.log("Deleted: ", targetFilePath);
  }
  // handle the change event modified or created
  const sourceFolderPath = path.join(sourceFolder, filename);
  const targetFolderPath = path.join(targetFolder, filename);
  fs.copyFileSync(sourceFolderPath, targetFolderPath);
  console.log(`Copied: ${sourceFolderPath} to ${targetFolderPath}`);
});
console.log(`Watching ${sourceFolder} for changes...`);
