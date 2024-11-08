import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
// import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export const firebase = {
  app,
  auth,
  storage
};

// const analytics = getAnalytics(app);

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function uploadBlobToFireStorage(
  blob: Blob,
  destinationBlobName?: string
): Promise<string> {
  const storageRef = ref(
    firebase.storage,
    `images/${destinationBlobName || uuidv4()}`
  );
  await uploadBytes(storageRef, blob);
  const url = await getDownloadURL(storageRef);
  return url;
}
