import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/messaging";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { options } from "./firebase.json";

const app = firebase.initializeApp(options);

export const database = firebase.database();
export const auth = firebase.auth();
export const messaging = firebase.messaging?.isSupported() ? getMessaging() : null;

export const firebaseOptions = options;
