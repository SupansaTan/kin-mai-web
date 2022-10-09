import { defineConfig } from "cypress";
const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        ...browserify.defaultOptions,
        typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
      };

      on('file:preprocessor', cucumber(options));
    },
    specPattern: "cypress/integration/*.feature",
  },
});
