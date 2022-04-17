import { database } from "..";

export const adminRef = database.ref("/admin");
export const adminCredentialsRef = database.ref("/admin/credentials");
export const adminDistrictRef = database.ref("/admin/districts");
