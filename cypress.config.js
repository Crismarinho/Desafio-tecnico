const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
      pageLoadTimeout: 60000,
      defaultCommandTimeout: 10000,
      viewportHeight: 768,
      viewportWidth: 1366
  },
});
