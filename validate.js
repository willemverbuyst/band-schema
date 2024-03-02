"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajv_1 = require("ajv");
var ajv_formats_1 = require("ajv-formats");
var fs = require("fs");
var path = require("path");
var ajv = new ajv_1.default({
    allErrors: true,
});
(0, ajv_formats_1.default)(ajv);
var schema = JSON.parse(fs.readFileSync("./schema/band-schema.json", { encoding: "utf-8" }));
function validateJSONFiles() {
    var jsonFiles = fs
        .readdirSync("./examples")
        .filter(function (file) { return file.endsWith(".json"); });
    jsonFiles.forEach(function (file) {
        var filePath = path.join("./examples", file);
        var jsonData = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
        var validate = ajv.compile(schema);
        var valid = validate(jsonData);
        if (!valid) {
            console.error("Validation errors in ".concat(file, ":"), validate.errors);
            process.exit(1); // Exit with error code to signal failure
        }
        else {
            console.log("".concat(file, " is valid."));
        }
    });
    console.log("All files are valid.");
}
validateJSONFiles();
