function setEnv() {
  fs = require("fs");
  writeFile = fs.writeFile;
  targetPath = "/vercel/path1/src/environments/environment.prod.ts";

  const environment = {
    production: true,
    kinMaiApi: process.env.KIN_MAI_API,
    googleMapsApi: process.env.GOOGLE_MAP_API,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    awsS3Url: process.env.AWS_S3_URL,
  };

  writeFile(targetPath, environment, function (err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });
}

setEnv();
