const JSONAPIFactory = require("@cardstack/test-support/jsonapi-factory");
const projectRouter = require("./router");
const defaultRouter = require("@cardstack/routing/cardstack/default-router");
const loadAllDataSources = require("./load-all-data-sources");

/*
  This file is a good place to define grants and groups that are
  shared between multiple Cards. Grants and groups can also be
  defined on each Card's static-model.js.
  
  Most developers only need to edit the `customGrantsAndGroups`
  function below. The code in the rest of the file sets up internals,
  creates a Mock User for testing, and allows anonymous users
  to view the cardhost Card (where login forms and landing pages go).
*/

const customGrantsAndGroups = function(factory, cardSchemas) {

  // With this grant, anonymous users can see all Cards in the project.
  // Remove this line when you want to do card-by-card permissions instead.
  // everyoneCanReadAllCards(factory, cardSchemas);

  // Your own groups and grants go here. Here are basics to get you started.
  // You can reference them in any Card in your project.

  factory.addResource("groups", "github-readers").withAttributes({
    "search-query": {
      filter: {
        type: { exact: "github-users" },
        permissions: { exact: "cardstack/project-template-data:read" }
      }
    }
  });

  factory.addResource("groups", "github-writers").withAttributes({
    "search-query": {
      filter: {
        type: { exact: "github-users" },
        permissions: { exact: "cardstack/project-template-data:write" }
      }
    }
  });

  factory.addResource("grants")
    .withRelated("who", [{ type: "groups", id: "github-readers" }])
    .withAttributes({
      mayLogin: true
    });

  factory.addResource("grants")
    .withRelated("who", [{ type: "fields", id: "id" }])
    .withRelated("types", [{ type: "content-types", id: "github-users" }])
    .withAttributes({
      "may-read-resource": true,
      "may-read-fields": true
    });
};

const everyoneCanReadAllCards = function(factory, cardSchemas) {
  let allContentTypes = cardSchemas
    .getModels()
    .filter(i => i.type === "content-types")
    .map(i => {
      return { type: "content-types", id: i.id };
    });

  factory
    .addResource("grants")
    .withRelated("who", [{ type: "groups", id: "everyone" }])
    .withRelated("types", allContentTypes)
    .withAttributes({
      "may-read-resource": true,
      "may-read-fields": true
    });
};

const createMockUser = function(factory) {
  factory.addResource("data-sources", "mock-auth").withAttributes({
    sourceType: "@cardstack/mock-auth",
    "user-rewriter": "./cardstack/mock-auth-rewriter.js",
    params: {
      provideUserSchema: false,
      mockedTypes: ["github-users"],
      users: {
        "mock-user": {
          type: "github-users",
          id: "mock-user", // this ID is meant to be the github username. Please adjust as necessary
          attributes: {
            name: "Mock User",
            "avatar-url": "https://avatars2.githubusercontent.com/u/61075",
            permissions: [
              "cardstack/project-template-data:read",
              "cardstack/project-template-data:write"
            ]
          }
        }
      }
    }
  });
};

const generalSetup = function(factory) {
  // You probably do not need to edit this function.

  // required for the Hub to work
  factory
    .addResource("grants")
    .withRelated("who", [{ type: "groups", id: "everyone" }])
    .withRelated("types", [
      { type: "content-types", id: "content-types" },
      { type: "content-types", id: "spaces" }
    ])
    .withAttributes({
      "may-read-resource": true,
      "may-read-fields": true
    });

  // These grants enable an anonymous user to access the cardhost Card,
  // which often contains a landing page, login buttons, and navigation
  factory
    .addResource("grants", "app-card-grant")
    .withRelated("who", [{ type: "groups", id: "everyone" }])
    .withRelated("types", [
      { type: "content-types", id: "content-types" },
      { type: "content-types", id: "spaces" }
    ])
    .withAttributes({
      "may-read-resource": true,
      "may-read-fields": true
    });

  const router =
    process.env.HUB_ENVIRONMENT === "test" &&
    process.env.TEST &&
    process.env.TEST.includes("cards/")
      ? defaultRouter
      : projectRouter;

  factory.addResource("content-types", "app-cards").withAttributes({ router });

  // This determines which Card is the cardhost.
  // In older projects, the cardhost often had the same name
  // as the overall project instead of being called "cardhost".
  factory.addResource("app-cards", "cardhost");
};

module.exports = function() {
  let factory = new JSONAPIFactory();
  let cardSchemas = new JSONAPIFactory();
  let dataSources = new JSONAPIFactory();

  loadAllDataSources(factory, cardSchemas, dataSources);

  generalSetup(factory);

  const isUsingGitHub =
    process.env.GITHUB_CLIENT_ID ||
    process.env.GITHUB_CLIENT_SECRET ||
    process.env.GITHUB_TOKEN;

  if (process.env.HUB_ENVIRONMENT === "development" && !isUsingGitHub) {
    // the mock user is helpful for local testing
    createMockUser(factory);
  }

  customGrantsAndGroups(factory, cardSchemas);

  return factory.getModels();
};
