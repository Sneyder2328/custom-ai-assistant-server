import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase Admin SDK
admin.initializeApp({
  // @ts-ignore
  credential: cert(serviceAccount),
});

import sequelize from "./config/database.js";
import { app } from "./app.js";
import { vectorDataSource } from "./services/vector-stores/index.js";

// Start the server
sequelize.sync().then(async () => {
  await vectorDataSource.init(); // init vector store database
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
});
