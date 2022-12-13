"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_oauth2_1 = require("nativescript-oauth2");
var providers_1 = require("nativescript-oauth2/providers");
var client = null;
function configureOAuthProviders() {
    var microsoftProvider = configureOAuthProviderMicrosoft();
    var googleProvider = configureOAuthProviderGoogle();
    var facebookProvider = configureOAuthProviderFacebook();
    nativescript_oauth2_1.configureTnsOAuth([ googleProvider, facebookProvider]);
}
exports.configureOAuthProviders = configureOAuthProviders;
function configureOAuthProviderGoogle() {
    var googleProviderOptions = {
        openIdSupport: "oid-full",
        clientId: "198583103200-esbqglrhnnlmn0huuuvr5p8sna97e0vn.apps.googleusercontent.com",
        redirectUri: "com.googleusercontent.apps.198583103200-esbqglrhnnlmn0huuuvr5p8sna97e0vn:/auth",
        urlScheme: "com.googleusercontent.apps.198583103200-esbqglrhnnlmn0huuuvr5p8sna97e0vn",
        scopes: ["email","profile","openid"]
    };
    var googleProvider = new providers_1.TnsOaProviderGoogle(googleProviderOptions);
    return googleProvider;
}
function configureOAuthProviderFacebook() {
    var facebookProviderOptions = {
        openIdSupport: "oid-none",
        clientId: "451063223693260",
        clientSecret: "cc4073bc002287142abe6deba940936e",
        redirectUri: "https://www.facebook.com/connect/login_success.html",
        scopes: ["email","name","id","last_name"]
    };
    var facebookProvider = new providers_1.TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;
}
function configureOAuthProviderMicrosoft() {
    var microsoftProviderOptions = {
        openIdSupport: "oid-full",
        clientId: "f376fa87-64a9-49a1-8b56-e0d48fc0810b",
        // redirectUri: "urn:ietf:wg:oauth:2.0:oob",
        redirectUri: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b://auth",
        urlScheme: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b",
        scopes: ["https://outlook.office.com/mail.read"]
    };
    var microsoftProvider = new providers_1.TnsOaProviderMicrosoft(microsoftProviderOptions);
    return microsoftProvider;
}
function tnsOauthLogin(providerType) {
   return new Promise((resolve, reject) => {
        client = new nativescript_oauth2_1.TnsOAuthClient(providerType);
        client.loginWithCompletion(function (tokenResult, error) {
            if (error) {
                // console.error("back to main page with error: ");
                // console.error(error);
                reject(error)
            }
            else {
                // console.log("back to main page with access token: ");
                resolve(tokenResult)
                // console.log(tokenResult);
            }
        });
    });
}
exports.tnsOauthLogin = tnsOauthLogin;
function tnsOauthLogout() {
    if (client) {
        client.logout();
    }
}
exports.tnsOauthLogout = tnsOauthLogout;