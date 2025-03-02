import * as fs from "fs";
import path from "path";

const filePath = "data.json"; // JSON file to modify

// // Read the JSON file
// const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// // Modify the JSON data (example: add a new key)
// jsonData.newKey = "New Value";

// // Write the modified JSON back to the file
// fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

// console.log("JSON file updated successfully!");

export function generateTemplatesCache() {
  const templatesHome = "./public/data/templates";

  const cacheTemplatesFolder = path.resolve("./src/assets/data/cache");
  if (!fs.existsSync(cacheTemplatesFolder)) {
    fs.mkdirSync(cacheTemplatesFolder, { recursive: true });
  }
  const cacheTemplatesFpath = path.join(cacheTemplatesFolder, "templates.json");

  fs.readdir(templatesHome, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    const templates: Array<any> = [];
    files.forEach(function (file, index) {
      const templateFpath = path.join(templatesHome, file);
      const template = JSON.parse(fs.readFileSync(templateFpath, "utf-8"));
      templates.push({
        hashed_id: template.hashed_id,
        id: template.id,
      });
    });
    fs.writeFileSync(cacheTemplatesFpath, JSON.stringify(templates, null, 4), "utf-8");
  });
}

generateTemplatesCache();
