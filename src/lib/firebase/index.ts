import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
// import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebase = {
  app,
  auth
};

// const analytics = getAnalytics(app);
