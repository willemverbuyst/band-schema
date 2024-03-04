import Ajv from "ajv";
import addFormats from "ajv-formats";
import * as fs from "fs";
import * as path from "path";

const ajv = new Ajv({
  allErrors: true,
});
addFormats(ajv);

const schema = JSON.parse(
  fs.readFileSync("./schema/band-schema.json", { encoding: "utf-8" }),
);

function validateJSONFiles(): void {
  const jsonFiles = fs
    .readdirSync("./examples")
    .filter((file) => file.endsWith(".json"));
  jsonFiles.forEach((file) => {
    const filePath = path.join("./examples", file);
    const jsonData = JSON.parse(
      fs.readFileSync(filePath, { encoding: "utf-8" }),
    );
    const validate = ajv.compile(schema);
    const valid = validate(jsonData);
    if (!valid) {
      console.error(`Validation errors in ${file}:`, validate.errors);
      process.exit(1); // Exit with error code to signal failure
    } else {
      console.log(`${file} is valid.`);
    }
  });
  console.log("All files are valid.");
}

validateJSONFiles();
