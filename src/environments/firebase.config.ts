import {AuthMethods, AuthProviders} from "angularfire2/index";

export const firebaseConfig = {
    apiKey: "*",
    authDomain: "*",
    databaseURL: "*",
    storageBucket: "*",
    messagingSenderId: "*"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}