import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import serviceAccount from "./serviceAccountKey.json";

// Initialize Firebase Admin SDK
admin.initializeApp({
  // @ts-ignore
  credential: cert(serviceAccount),
});

const env = (process.env.NODE_ENV || "development").trim();

if (env === "development") {
  require("dotenv").config();
}

import sequelize from "./config/database";
import { app } from "./app";

// Start the server
sequelize.sync().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
});
