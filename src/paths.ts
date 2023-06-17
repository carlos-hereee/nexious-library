import "module-alias/register";
import { addAliases } from "module-alias";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

addAliases({
  atoms: path.resolve(__dirname, "/atoms"),
  helpers: path.resolve(__dirname, "/helpers"),
  molecules: path.resolve(__dirname, "/molecules"),
  math: path.resolve(__dirname, "/math"),
  organism: path.resolve(__dirname, "/organism"),
});
