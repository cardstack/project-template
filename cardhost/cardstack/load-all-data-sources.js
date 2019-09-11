const { readdirSync, existsSync } = require("fs");
const { join } = require("path");
const cardDir = join(__dirname, "../../cards");

/*
  This function iterates over the cards directory and loads
  in each Card's schema.
*/

module.exports = function(factory, cardSchemas, dataSources) {
  for (let dataSourceFile of readdirSync(join(__dirname, "data-sources"))) {
    let filePath = join(__dirname, "data-sources", dataSourceFile);
    dataSources.importModels(require(filePath));
  }
  let dataSourceTypes = dataSources
    .getModels()
    .filter(i => i.type === "data-sources")
    .map(i => i.attributes.sourceType || i.attributes["source-type"]);
  for (let cardName of readdirSync(cardDir)) {
    let packageJsonFile = join(cardDir, cardName, "package.json");
    if (!existsSync(packageJsonFile)) {
      continue;
    }

    let packageJson = require(packageJsonFile);
    if (dataSourceTypes.includes(packageJson.name)) {
      continue;
    }

    let schemaFile = join(cardDir, cardName, "cardstack", "static-model.js");
    if (existsSync(schemaFile)) {
      cardSchemas.importModels(require(schemaFile)());
      factory
        .addResource("data-sources")
        .withAttributes({ sourceType: `cardhost-${cardName}` });
    }
  }
};
