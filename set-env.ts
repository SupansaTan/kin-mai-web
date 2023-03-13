import { writeFile } from 'fs';
require('dotenv').load();

const targetPathDev = "/vercel/path1/src/environments/environment.ts";
const targetPathProd = "/vercel/path1/src/environments/environment.prod.ts";

const envConfigFile = `export const environment = {
  production: true,
  kinMaiApi: '${process.env.KIN_MAI_API}',
  googleMapsApi: '${process.env.GOOGLE_MAP_API}',
  googleClientId: '${process.env.GOOGLE_CLIENT_ID}',
  googleClientSecret: '${process.env.GOOGLE_CLIENT_SECRET}',
  awsS3Url: '${process.env.AWS_S3_URL}',
};
`;

writeFile(targetPathDev, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated correctly at ${targetPathDev} \n`);
  }
});

writeFile(targetPathProd, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated correctly at ${targetPathDev} \n`);
  }
});
