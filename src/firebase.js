import { initializeApp } from "../node_modules/@firebase/app";
import { getAnalytics } from "../node_modules/@firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA2UTUsENZYy-Unuf7TirzcfPmDRsQJ93w",
  authDomain: "quotedaily-9e1c2.firebaseapp.com",
  projectId: "quotedaily-9e1c2",
  storageBucket: "quotedaily-9e1c2.appspot.com",
  messagingSenderId: "101258276527",
  appId: "1:101258276527:web:360036948e09101fffee5a",
  measurementId: "G-0366EZJ1MW",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
