import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { options } from "./firebase.json";

firebase.initializeApp(options);

export const database = firebase.database();
