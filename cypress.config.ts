import { defineConfig } from "cypress";
import { environment } from "src/environments/environment";
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
    baseUrl: 'http://localhost:4200',
    experimentalSessionAndOrigin: true,
  },
  env: {
    googleClientId: environment.googleClientId,
    googleClientSecret: environment.googleClientSecret,

  },
});
