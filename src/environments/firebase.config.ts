import {AuthMethods, AuthProviders} from "angularfire2/index";

export const firebaseConfig = {
    apiKey: "AIzaSyC2-Bt2eP64CxHbztz6YLomHHz0PkvzYnw",
    authDomain: "oasit-b6bc8.firebaseapp.com",
    databaseURL: "https://oasit-b6bc8.firebaseio.com",
    storageBucket: "oasit-b6bc8.appspot.com",
    messagingSenderId: "334270939180"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}