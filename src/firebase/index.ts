import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import { options } from "./firebase.json";

firebase.initializeApp(options);

export const database = firebase.database();
export const auth = firebase.auth();
export * from "./refs";
export const firebaseOptions = options;
